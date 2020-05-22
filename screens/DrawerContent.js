/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Text, 
  Drawer,
  TouchableRipple,
  Switch,
  ToggleButton,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSectiom}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'data:image/png;base64,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',
                }}
                size={70}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Yasas Ekanayaka</Title>
                <Caption style={styles.caption}>@yasasdek</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.Paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.Caption}>  Oreder Completed</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="check" color={color} size={size} />
              )}
              label="Completed Orders"
              onPress={() => {
                props.navigation.navigate('CompletedOrders');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />  
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="alert-circle" color={color} size={size} />
              )}
              label="About us"
              onPress={() => {
                props.navigation.navigate('AboutUsScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.Preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSectiom: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  Paragraph: {
    marginTop: 3,
    fontWeight: 'bold',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  Preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
