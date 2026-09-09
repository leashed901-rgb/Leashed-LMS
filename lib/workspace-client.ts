/**
 * Client helpers for Google Workspace Services & Picker API
 */

declare global {
  interface Window {
    gapi?: {
      load: (api: string, callback: () => void) => void;
    };
    google?: {
      picker?: {
        PickerBuilder: new () => {
          addView: (view: unknown) => unknown;
          setOAuthToken: (token: string) => unknown;
          setCallback: (callback: (data: unknown) => void) => unknown;
          setOrigin: (origin: string) => unknown;
          build: () => { setVisible: (visible: boolean) => void };
        };
        ViewId: {
          DOCS: string;
          DOCUMENTS: string;
          PRESENTATIONS: string;
          FORMS: string;
          FOLDERS: string;
        };
        Action: {
          PICKED: string;
          CANCEL: string;
        };
      };
    };
  }
}

/**
 * Load Google Picker script dynamically
 */
export const loadGooglePickerScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();

    if (window.google?.picker) {
      return resolve();
    }

    if (window.gapi) {
      window.gapi.load('picker', () => {
        resolve();
      });
      return;
    }

    const existingScript = document.getElementById('google-picker-script');
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.google?.picker || window.gapi) {
          clearInterval(checkInterval);
          if (window.gapi && !window.google?.picker) {
            window.gapi.load('picker', () => resolve());
          } else {
            resolve();
          }
        }
      }, 100);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-picker-script';
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.onload = () => {
      if (window.gapi) {
        window.gapi.load('picker', () => {
          resolve();
        });
      } else {
        resolve();
      }
    };
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
};

/**
 * Open Google Picker Dialog
 */
export const openGooglePicker = async (
  accessToken: string,
  onPick: (doc: { id: string; name: string; url: string; mimeType: string }) => void,
  viewType: 'DOCS' | 'PRESENTATIONS' | 'FORMS' = 'DOCS'
) => {
  await loadGooglePickerScript();

  if (!window.google?.picker) {
    throw new Error('Google Picker library could not be loaded');
  }

  const pickerOrigin =
    typeof window !== 'undefined' &&
    window.location.ancestorOrigins &&
    window.location.ancestorOrigins.length > 0
      ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
      : typeof window !== 'undefined'
      ? window.location.origin
      : '';

  const pickerBuilder = new window.google.picker.PickerBuilder();

  let viewId = window.google.picker.ViewId.DOCS;
  if (viewType === 'PRESENTATIONS' && window.google.picker.ViewId.PRESENTATIONS) {
    viewId = window.google.picker.ViewId.PRESENTATIONS;
  } else if (viewType === 'FORMS' && window.google.picker.ViewId.FORMS) {
    viewId = window.google.picker.ViewId.FORMS;
  }

  const builder = pickerBuilder as any;
  const picker = builder
    .addView(viewId)
    .setOAuthToken(accessToken)
    .setCallback((data: any) => {
      if (data?.action === window.google?.picker?.Action.PICKED && data?.docs?.[0]) {
        onPick(data.docs[0]);
      }
    })
    .setOrigin(pickerOrigin)
    .build();

  picker.setVisible(true);
};
