import React, {memo} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface HeaderActionButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  badgeCount?: number;
}

const HeaderActionButton = ({
  children,
  onPress,
  badgeCount,
}: HeaderActionButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.actionButton}>
      
      <View>
        {children}

        {!!badgeCount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(HeaderActionButton);

const styles = StyleSheet.create({
  actionButton: {
    width: 40,
    height: 40,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F5F5F5',

    marginLeft: 10,
  },

  badge: {
    position: 'absolute',

    right: -8,
    top: -6,

    minWidth: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: '#FF3B30',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#FFF',

    fontSize: 10,
    fontWeight: '700',
  },
});