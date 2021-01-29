import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Button,
  Animated,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ViewPager from '@react-native-community/viewpager';
import { logoUrl } from './utils';

import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';

interface PageProps {
  title: string;
  description: string;
  onPress: () => void;
  buttonTitle: string;
}
const Page = ({ title, description, onPress, buttonTitle }: PageProps) => {
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      <TextInput style={styles.textInput} />
      <Button onPress={onPress} title={buttonTitle} />
    </>
  );
};

class ElementViewPager extends ViewPager<JSX.Element> {}
const AnimatedViewPager = Animated.createAnimatedComponent(ElementViewPager);

export function KeyboardExample() {
  const { ref, ...navigationPanel } = useNavigationPanel(2);
  const { setPage } = navigationPanel;
  const pages = [
    <View style={styles.sectionContainer}>
      <Page
        title="First Question"
        description="What is your favourite lib ?"
        onPress={useCallback(() => setPage(1), [setPage])}
        buttonTitle="Go to next question"
      />
    </View>,
    <View style={styles.sectionContainer}>
      <Page
        title="Second Question"
        description="Why ViewPager?"
        onPress={useCallback(() => setPage(0), [setPage])}
        buttonTitle="Go to previous question"
      />
    </View>,
  ];
  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView contentContainerStyle={styles.flex} style={styles.flex}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: logoUrl,
            }}
          />
        </View>
        <View style={styles.flex}>
          <AnimatedViewPager
            ref={ref}
            style={styles.flex}
            scrollEnabled={false}
            data={pages}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item }) => item}
          />
        </View>
      </ScrollView>
      <NavigationPanel
        {...navigationPanel}
        scrollEnabled={false}
        disablePagesAmountManagement
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  sectionDescription: {
    marginVertical: 16,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});