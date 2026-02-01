'use client';

import React, { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { LocalNotifications, ScheduleOptions, PendingLocalNotificationSchema } from '@capacitor/local-notifications';

type Platform = 'web' | 'ios' | 'android';

interface NativeContextValue {
    // Platform info
    isNative: boolean;
    platform: Platform;
    isReady: boolean;

    // Haptic feedback
    hapticLight: () => Promise<void>;
    hapticMedium: () => Promise<void>;
    hapticHeavy: () => Promise<void>;
    hapticSuccess: () => Promise<void>;
    hapticWarning: () => Promise<void>;
    hapticError: () => Promise<void>;
    hapticSelection: () => Promise<void>;

    // Notifications
    scheduleNotification: (options: {
        title: string;
        body: string;
        id?: number;
        scheduleAt?: Date;
    }) => Promise<void>;
    cancelAllNotifications: () => Promise<void>;
    getPendingNotifications: () => Promise<PendingLocalNotificationSchema[]>;
    requestNotificationPermission: () => Promise<boolean>;
}

const NativeContext = createContext<NativeContextValue | null>(null);

export function useNative(): NativeContextValue {
    const context = useContext(NativeContext);
    if (!context) {
        throw new Error('useNative must be used within a NativeProvider');
    }
    return context;
}

// Standalone haptic function for use outside React context
export async function triggerHaptic(style: 'light' | 'medium' | 'heavy' | 'selection' = 'medium') {
    if (Capacitor.isNativePlatform()) {
        try {
            const styleMap = {
                light: ImpactStyle.Light,
                medium: ImpactStyle.Medium,
                heavy: ImpactStyle.Heavy,
                selection: ImpactStyle.Light,
            };
            await Haptics.impact({ style: styleMap[style] });
        } catch (error) {
            console.error('Haptic error:', error);
        }
    }
}

interface NativeProviderProps {
    children: ReactNode;
}

export function NativeProvider({ children }: NativeProviderProps) {
    const [isNative, setIsNative] = useState(false);
    const [platform, setPlatform] = useState<Platform>('web');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initNative = async () => {
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

                    // Hide splash screen
                    await SplashScreen.hide();

                    // Keyboard listeners
                    await Keyboard.addListener('keyboardWillShow', () => {
                        document.body.classList.add('keyboard-visible');
                    });

                    await Keyboard.addListener('keyboardWillHide', () => {
                        document.body.classList.remove('keyboard-visible');
                    });

                    // Back button handling
                    await App.addListener('backButton', ({ canGoBack }) => {
                        if (canGoBack) {
                            window.history.back();
                        } else {
                            App.exitApp();
                        }
                    });

                    // Request notification permissions on start
                    await LocalNotifications.requestPermissions();

                } catch (error) {
                    console.error('Error initializing native features:', error);
                }
            }

            setIsReady(true);
        };

        initNative();

        return () => {
            if (Capacitor.isNativePlatform()) {
                App.removeAllListeners();
                Keyboard.removeAllListeners();
            }
        };
    }, []);

    // Haptic feedback functions
    const hapticLight = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.impact({ style: ImpactStyle.Light });
            } catch (e) { /* ignore */ }
        }
    }, []);

    const hapticMedium = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.impact({ style: ImpactStyle.Medium });
            } catch (e) { /* ignore */ }
        }
    }, []);

    const hapticHeavy = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.impact({ style: ImpactStyle.Heavy });
            } catch (e) { /* ignore */ }
        }
    }, []);

    const hapticSuccess = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.notification({ type: NotificationType.Success });
            } catch (e) { /* ignore */ }
        }
    }, []);

    const hapticWarning = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.notification({ type: NotificationType.Warning });
            } catch (e) { /* ignore */ }
        }
    }, []);

    const hapticError = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.notification({ type: NotificationType.Error });
            } catch (e) { /* ignore */ }
        }
    }, []);

    const hapticSelection = useCallback(async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.selectionStart();
                await Haptics.selectionEnd();
            } catch (e) { /* ignore */ }
        }
    }, []);

    // Notification functions
    const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
        if (!Capacitor.isNativePlatform()) return false;
        try {
            const result = await LocalNotifications.requestPermissions();
            return result.display === 'granted';
        } catch (e) {
            return false;
        }
    }, []);

    const scheduleNotification = useCallback(async (options: {
        title: string;
        body: string;
        id?: number;
        scheduleAt?: Date;
    }) => {
        if (!Capacitor.isNativePlatform()) return;

        try {
            const scheduleOptions: ScheduleOptions = {
                notifications: [{
                    id: options.id || Math.floor(Math.random() * 100000),
                    title: options.title,
                    body: options.body,
                    schedule: options.scheduleAt ? { at: options.scheduleAt } : undefined,
                    sound: undefined,
                    attachments: undefined,
                    actionTypeId: '',
                    extra: null,
                }],
            };

            await LocalNotifications.schedule(scheduleOptions);
        } catch (error) {
            console.error('Failed to schedule notification:', error);
        }
    }, []);

    const cancelAllNotifications = useCallback(async () => {
        if (!Capacitor.isNativePlatform()) return;
        try {
            const pending = await LocalNotifications.getPending();
            if (pending.notifications.length > 0) {
                await LocalNotifications.cancel({ notifications: pending.notifications });
            }
        } catch (e) { /* ignore */ }
    }, []);

    const getPendingNotifications = useCallback(async (): Promise<PendingLocalNotificationSchema[]> => {
        if (!Capacitor.isNativePlatform()) return [];
        try {
            const result = await LocalNotifications.getPending();
            return result.notifications;
        } catch (e) {
            return [];
        }
    }, []);

    const value: NativeContextValue = {
        isNative,
        platform,
        isReady,
        hapticLight,
        hapticMedium,
        hapticHeavy,
        hapticSuccess,
        hapticWarning,
        hapticError,
        hapticSelection,
        scheduleNotification,
        cancelAllNotifications,
        getPendingNotifications,
        requestNotificationPermission,
    };

    return (
        <NativeContext.Provider value={value}>
            {children}
        </NativeContext.Provider>
    );
}
