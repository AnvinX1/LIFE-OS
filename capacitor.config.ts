import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
    appId: 'app.lifeos.mobile',
    appName: 'Life OS',
    webDir: 'out',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            launchAutoHide: true,
            backgroundColor: '#e0e5ec',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
        },
        StatusBar: {
            style: 'LIGHT',
            backgroundColor: '#e0e5ec',
        },
        Keyboard: {
            resize: KeyboardResize.Body,
            resizeOnFullScreen: true,
        },
    },
};

export default config;
