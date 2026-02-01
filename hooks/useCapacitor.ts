'use client';

import { useEffect, useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Keyboard } from '@capacitor/keyboard';

type Platform = 'web' | 'ios' | 'android';

interface UseCapacitorReturn {
    isNative: boolean;
    platform: Platform;
    isReady: boolean;
    // Haptic feedback helpers
    hapticImpact: (style?: ImpactStyle) => Promise<void>;
    hapticNotification: (type?: NotificationType) => Promise<void>;
    hapticVibrate: () => Promise<void>;
}

export function useCapacitor(): UseCapacitorReturn {
    const [isNative, setIsNative] = useState(false);
    const [platform, setPlatform] = useState<Platform>('web');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initCapacitor = async () => {
            const currentPlatform = Capacitor.getPlatform() as Platform;
            const native = Capacitor.isNativePlatform();

            setIsNative(native);
            setPlatform(currentPlatform);

            if (native) {
                try {
                    // Configure status bar
                    await StatusBar.setStyle({ style: Style.Light });

                    if (currentPlatform === 'android') {
                        await StatusBar.setBackgroundColor({ color: '#e0e5ec' });
                    }

                    // Hide splash screen after app is ready
                    await SplashScreen.hide();

                    // Register keyboard listeners for better UX
                    await Keyboard.addListener('keyboardWillShow', () => {
                        document.body.classList.add('keyboard-visible');
                    });

                    await Keyboard.addListener('keyboardWillHide', () => {
                        document.body.classList.remove('keyboard-visible');
                    });

                    // Handle Android back button
                    await App.addListener('backButton', ({ canGoBack }) => {
                        if (canGoBack) {
                            window.history.back();
                        } else {
                            App.exitApp();
                        }
                    });

                    // Handle app state changes (for potential data sync)
                    await App.addListener('appStateChange', ({ isActive }) => {
                        if (isActive) {
                            // App came to foreground - could trigger data sync here
                            console.log('App is now active');
                        }
                    });

                } catch (error) {
                    console.error('Error initializing Capacitor plugins:', error);
                }
            }

            setIsReady(true);
        };

        initCapacitor();

        // Cleanup listeners on unmount
        return () => {
            if (Capacitor.isNativePlatform()) {
                App.removeAllListeners();
                Keyboard.removeAllListeners();
            }
        };
    }, []);

    // Haptic feedback helpers
    const hapticImpact = useCallback(async (style: ImpactStyle = ImpactStyle.Medium) => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.impact({ style });
            } catch (error) {
                console.error('Haptic impact error:', error);
            }
        }
    }, []);

    const hapticNotification = useCallback(async (type: NotificationType = NotificationType.Success) => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.notification({ type });
            } catch (error) {
                console.error('Haptic notification error:', error);
            }
        }
    }, []);

    const hapticVibrate = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.vibrate();
            } catch (error) {
                console.error('Haptic vibrate error:', error);
            }
        }
    }, []);

    return {
        isNative,
        platform,
        isReady,
        hapticImpact,
        hapticNotification,
        hapticVibrate,
    };
}
