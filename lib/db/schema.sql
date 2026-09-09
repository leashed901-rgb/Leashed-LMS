-- ============================================================================
-- LEASHED.IO ENTERPRISE MULTI-TENANT DATABASE SCHEMA (PostgreSQL DDL)
-- Reference: EDA AI Upskill Accelerator Program (EDGE Portal Submission 2026)
-- Security Standard: Zero-Trust Tenant Isolation with Row-Level Security (RLS)
-- Domains: learn.leashed.io, instructor.leashed.io, partner.leashed.io, global.leashed.io
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. TENANTS & DOMAINS REGISTRY
-- ============================================================================

CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    primary_domain VARCHAR(255) UNIQUE NOT NULL,
    tier VARCHAR(32) NOT NULL DEFAULT 'enterprise', -- 'standard', 'enterprise', 'government'
    status VARCHAR(32) NOT NULL DEFAULT 'active',    -- 'active', 'suspended', 'provisioning'
    compliance_framework VARCHAR(64) NOT NULL DEFAULT 'EDA-EDA-2026-NIST',
    allowed_auth_types JSONB NOT NULL DEFAULT '["password", "google_workspace", "saml_sso"]',
    config JSONB NOT NULL DEFAULT '{
        "require_mfa": false,
        "session_timeout_minutes": 60,
        "ip_allowlist": []
    }',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Core Enterprise Portals
INSERT INTO tenants (slug, name, primary_domain, tier, status, config) VALUES
('learn', 'Leashed Enrollee Learning Portal', 'learn.leashed.io', 'enterprise', 'active', '{"portal_type": "enrollee_lms", "allow_public_registration": true}'),
('instructor', 'Leashed Faculty & Clinical Simulation Portal', 'instructor.leashed.io', 'enterprise', 'active', '{"portal_type": "faculty_studio", "allow_public_registration": false, "require_faculty_approval": true}'),
('partner', 'Leashed Workforce & Salon Partner Gateway', 'partner.leashed.io', 'government', 'active', '{"portal_type": "employer_gateway", "eda_grant_tracking": true}'),
('global', 'Leashed Global Governance & Admin Root', 'global.leashed.io', 'enterprise', 'active', '{"portal_type": "global_governance", "require_mfa": true, "super_admin_only": true}')
ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- ============================================================================
-- 2. USERS & IDENTITY (TENANT-SCOPED)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    phone_number VARCHAR(32),
    role VARCHAR(32) NOT NULL, -- 'learner', 'instructor', 'partner', 'global_admin'
    status VARCHAR(32) NOT NULL DEFAULT 'active', -- 'active', 'pending_verification', 'suspended'
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    mfa_secret VARCHAR(255),
    last_login_at TIMESTAMPTZ,
    last_login_ip VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_tenant_user_email UNIQUE (tenant_id, email)
);

-- Indexes for lightning-fast multi-tenant identity lookups
CREATE INDEX IF NOT EXISTS idx_users_tenant_email ON users(tenant_id, email);
CREATE INDEX IF NOT EXISTS idx_users_tenant_role ON users(tenant_id, role);

-- ============================================================================
-- 3. COURSES, MODULES & SCENARIO BLUEPRINTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(64) NOT NULL,
    difficulty VARCHAR(32) NOT NULL DEFAULT 'intermediate',
    estimated_duration_hours INT NOT NULL DEFAULT 40,
    scorm_compliant BOOLEAN NOT NULL DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_tenant_course_code UNIQUE (tenant_id, code)
);

CREATE TABLE IF NOT EXISTS branching_scenarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    canine_breed VARCHAR(64) NOT NULL,
    coat_type VARCHAR(64) NOT NULL,
    temperament VARCHAR(64) NOT NULL,
    target_role VARCHAR(64) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    nodes JSONB NOT NULL DEFAULT '[]',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. ENROLLMENTS & CLINICAL PERFORMANCE
-- ============================================================================

CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    progress_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(32) NOT NULL DEFAULT 'in_progress', -- 'enrolled', 'in_progress', 'completed', 'certified'
    clinical_score INT,
    eda_grant_voucher_id VARCHAR(64),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_course_enrollment UNIQUE (tenant_id, user_id, course_id)
);

-- ============================================================================
-- 5. IMMUTABLE SECURITY & COMPLIANCE AUDIT LOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(64) NOT NULL, 
    -- 'AUTH_LOGIN_SUCCESS', 'AUTH_LOGIN_FAILED', 'TENANT_BREACH_ATTEMPT', 
    -- 'ROLE_ELEVATION_REJECTED', 'COURSE_CERTIFIED', 'SCENARIO_MUTATED'
    severity VARCHAR(16) NOT NULL DEFAULT 'INFO', -- 'INFO', 'WARN', 'CRITICAL', 'ALERT'
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON audit_logs(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_severity ON audit_logs(severity);

-- ============================================================================
-- 6. ROW-LEVEL SECURITY (RLS) ZERO-TRUST ENFORCEMENT
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE branching_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Dynamic Tenant Context Isolation Policies
DROP POLICY IF EXISTS tenant_isolation_users ON users;
CREATE POLICY tenant_isolation_users ON users
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
        OR current_setting('app.is_global_admin', true) = 'true'
    );

DROP POLICY IF EXISTS tenant_isolation_courses ON courses;
CREATE POLICY tenant_isolation_courses ON courses
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
        OR current_setting('app.is_global_admin', true) = 'true'
    );

DROP POLICY IF EXISTS tenant_isolation_scenarios ON branching_scenarios;
CREATE POLICY tenant_isolation_scenarios ON branching_scenarios
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
        OR current_setting('app.is_global_admin', true) = 'true'
    );

DROP POLICY IF EXISTS tenant_isolation_enrollments ON enrollments;
CREATE POLICY tenant_isolation_enrollments ON enrollments
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
        OR current_setting('app.is_global_admin', true) = 'true'
    );

DROP POLICY IF EXISTS tenant_isolation_audit_logs ON audit_logs;
CREATE POLICY tenant_isolation_audit_logs ON audit_logs
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
        OR current_setting('app.is_global_admin', true) = 'true'
    );
