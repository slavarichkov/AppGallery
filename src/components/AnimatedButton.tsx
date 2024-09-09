import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Easing, Text } from 'react-native';

interface IAnimatedButtonProps {
    animate: boolean;
    onPress: () => void;
}

const AnimatedButton: React.FC<IAnimatedButtonProps> = ({ animate, onPress }) => {
    const sizeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(sizeAnimation, {
            toValue: animate ? 50 : 0,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, [animate]);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Animated.View
                style={[
                    styles.button,
                    {
                        width: sizeAnimation,
                        height: sizeAnimation,
                        borderRadius: sizeAnimation.interpolate({
                            inputRange: [0, 20],
                            outputRange: [0, 20],
                        }),
                    },
                ]}
            >
                <Text>▲</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnimatedButton;