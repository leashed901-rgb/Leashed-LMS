'use client';

import React, { useState } from 'react';
import { Scenario } from '@/lib/types';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Code, 
  FileArchive, 
  Share2, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ExportHubModalProps {
  scenario: Scenario;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHubModal: React.FC<ExportHubModalProps> = ({
  scenario,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'scorm' | 'xapi' | 'embed' | 'json'>('scorm');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const scormManifestXML = `<?xml version="1.0" standalone="no" ?>
<manifest identifier="com.cogniflow.scenario.${scenario.id}" version="1.0"
          xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 4th Edition</schemaversion>
  </metadata>
  <organizations default="org_1">
    <organization identifier="org_1">
      <title>${scenario.title}</title>
      <item identifier="item_1" identifierref="res_1">
        <title>${scenario.title} - Interactive Simulation</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res_1" type="webcontent" adlcp:scormType="sco" href="index.html">
      <file href="index.html"/>
      <file href="scenario.json"/>
    </resource>
  </resources>
</manifest>`;

  const xapiStatement = {
    actor: {
      mbox: "mailto:learner@enterprise.com",
      name: "Jane Doe"
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/completed",
      display: { "en-US": "completed simulation" }
    },
    object: {
      id: `https://lms.cogniflow.io/scenarios/${scenario.id}`,
      definition: {
        name: { "en-US": scenario.title },
        description: { "en-US": scenario.description },
        type: "http://adlnet.gov/expapi/activities/simulation"
      }
    },
    result: {
      completion: true,
      success: true,
      score: { scaled: 0.94, raw: 94, min: 0, max: 100 }
    }
  };

  const embedCode = `<iframe 
  src="https://lms.cogniflow.io/embed/scenario/${scenario.id}" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allow="autoplay; fullscreen; microphone"
  style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
></iframe>`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'scorm':
        return scormManifestXML;
      case 'xapi':
        return JSON.stringify(xapiStatement, null, 2);
      case 'embed':
        return embedCode;
      case 'json':
        return JSON.stringify(scenario, null, 2);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(scenario, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scenario.id}-dag.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">SCORM, xAPI & LMS Embed Hub</h3>
              <p className="text-xs text-slate-500">
                Deploy this scenario directly into Canvas, Moodle, Blackboard, Cornerstone, or web classrooms
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('scorm')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-all ${
              activeTab === 'scorm'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileArchive className="h-3.5 w-3.5" />
            SCORM 2004 Manifest
          </button>

          <button
            onClick={() => setActiveTab('xapi')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-all ${
              activeTab === 'xapi'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            xAPI (Tin Can) JSON
          </button>

          <button
            onClick={() => setActiveTab('embed')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-all ${
              activeTab === 'embed'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Embed iFrame Code
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-all ${
              activeTab === 'json'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Full Scenario DAG JSON
          </button>
        </div>

        {/* Code display */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200">
          <pre className="overflow-x-auto whitespace-pre leading-relaxed">
            {getActiveCode()}
          </pre>
        </div>

        {/* Footer controls */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Compliant with ADL SCORM 2004 4th Edition & IEEE Standard for Learning Metadata
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Download JSON
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy Snippet
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
