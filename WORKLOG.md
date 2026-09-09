# LEASHED.IO ENTERPRISE ARCHITECTURE WORKLOG

> **Architectural Directive**: "No shortcuts, no quick wins ever. Enterprise is not just a name; enterprise is how it is architected and presented with the user in mind."

---

## 1. Executive Summary & Philosophy

Leashed.io is architected as an enterprise-grade, multi-tenant learning and clinical simulation platform supporting the national **AI Upskill Accelerator Pilot Program** (EDA $25M initiative, submission deadline July 10, 2026 via EDGE).

The platform serves vulnerable adult learners, justice-involved individuals, and rural workers transitioning into high-wage canine styling, pet care entrepreneurship, and veterinary assistive technology careers. To protect enrollees, instructors, employers, and government sponsors, the application adheres to strict enterprise zero-trust principles:

1. **Subdomain / Multi-Tenant Isolation**: Separation of tenant contexts by domain (`learn.leashed.io`, `instructor.leashed.io`, `partner.leashed.io`, `global.leashed.io`).
2. **Zero Role-Switching Vulnerabilities**: Complete elimination of client-side role selectors. Roles are server-authoritative, cryptographic, and tied to authenticated tenant authority.
3. **Dedicated Full-Page Gateways**: No transient modals for authentication. Each tenant has a dedicated, full-screen, branded, and auditable enterprise gateway.
4. **Relational Multi-Tenant Data Architecture**: PostgreSQL schema with Row-Level Security (RLS) enforcement on all core entity tables (`users`, `courses`, `enrollments`, `scenarios`, `audit_logs`).
5. **Immutable Compliance & Security Auditing**: Real-time logging of authentication events, tenant boundary crossings, and privilege verification.

---

## 2. Multi-Tenant Domain Topography

The platform is partitioned into four distinct operational portals, each accessible via its own dedicated URL:

| Subdomain | Tenant Slug | Target Audience | Primary Authority & Scope |
| :--- | :--- | :--- | :--- |
| **`learn.leashed.io`** | `learn` | Enrollees & Prospective Students | Public Front Door, Student Admissions, Course Player, Branching Scenario Simulator, 72-Hour Roadmap, Certifications. |
| **`instructor.leashed.io`** | `instructor` | Clinical Faculty & Educators | Faculty Portal, Scenario Builder Studio, AI Scenario Generator, Clinical Rubrics, Student Performance Oversight. |
| **`partner.leashed.io`** | `partner` | Salon Owners & Workforce Agencies | Partner Portal, EDA Grant Apprenticeship Tracker, Talent Pipeline, SCORM 2004 Course Packages, Placement Vouchers. |
| **`global.leashed.io`** | `global` | System Administrators & Governance | Global Admin Dashboard, Multi-Tenant Provisioning, SQL Schema & RLS Policy Inspector, Immutable Audit Stream. |

---

## 3. Threat Model: Why Client-Side Role Switching is Banned

In traditional prototype LMS designs, developers often include a role switcher (e.g. tabs or dropdowns for "Learner / Instructor / Admin / Partner") directly on the login form. 

### Critical Vulnerabilities Identified:
- **Client-Side Privilege Escalation**: Attackers manipulate client state or intercept request payloads to inject arbitrary role claims (`role: 'admin'`), bypassing backend verification.
- **Cross-Tenant Data Leakage**: An enrollee authenticated under one role could access faculty rubrics or proprietary salon employer records if sessions share an unpartitioned storage scope.
- **Lack of Non-Repudiation**: When credentials are not bound to a specific tenant domain, audit logs cannot distinguish legitimate admin logins from enrollee impersonations.

### Enterprise Remediation:
- **Role Binding to Tenant Authority**: The role is deterministic and strictly inferred from the tenant host (`learn` -> Learner, `instructor` -> Instructor, `partner` -> Partner / Salon Owner, `global` -> Global Admin).
- **Tenant Scope Validation**: An attempt to log into `global.leashed.io` using enrollee credentials produces an immediate authorization fault and triggers a `TENANT_BREACH_ATTEMPT` audit log event.
- **Full-Page Isolation**: Authentication is performed via full-screen dedicated gateways with isolated session cookies/tokens.

---

## 4. SQL Multi-Tenant Architecture & Row-Level Security (RLS)

All tenant data is segregated within a relational PostgreSQL database schema (`/lib/db/schema.sql`). 

### Core Schema Invariants:
1. **`tenants` Table**: Central registry of tenant tenants with configuration, tier, and status.
2. **`tenant_id` Foreign Keys**: Every business entity (`users`, `courses`, `scenarios`, `enrollments`) has a non-nullable `tenant_id UUID REFERENCES tenants(id)`.
3. **Row-Level Security (RLS)**:
   ```sql
   ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
   CREATE POLICY tenant_isolation_enrollments ON enrollments
     FOR ALL
     USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
   ```
4. **Immutable Audit Logging**:
   ```sql
   CREATE TABLE audit_logs (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     tenant_id UUID REFERENCES tenants(id),
     user_id UUID REFERENCES users(id),
     event_type VARCHAR(64) NOT NULL,
     severity VARCHAR(16) NOT NULL,
     ip_address VARCHAR(45) NOT NULL,
     metadata JSONB DEFAULT '{}',
     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   ```

---

## 5. Architectural Checklist for Future Iterations

- [x] Eliminate all modal-based authentication popups in favor of full-page dedicated gateways.
- [x] Deprecate client-side role switching tabs.
- [x] Implement multi-tenant domain routing for `learn`, `instructor`, `partner`, and `global`.
- [x] Provide full PostgreSQL DDL schema with RLS and audit log tables.
- [x] Provide enterprise multi-tenant service runtime with tenant isolation logic.
- [x] Embed live Worklog and SQL inspector inside `global.leashed.io`.
- [ ] Implement SAML 2.0 / Okta enterprise identity federation for partner salons and academic institutions.
- [ ] Connect multi-region read replicas for rural offline-first caching nodes.
