import LoadingComponent from "@/app/Components/LoadingComponent";
import WelcomeComponent from "@/app/Components/WelcomeComponent/WelcomeComponent";
import createAlert from "@/app/utilities/alerts/alert";
import useCheckToken from "@/app/utilities/hooks/useCheckToken";
import useLogout from "@/app/utilities/hooks/useLogout";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import CountersScreen from "../Counter/CountersScreen";

const Drawer = createDrawerNavigator();

type Props = {
  props: DrawerContentComponentProps;
  logout: () => void;
};

function CustomDrawerContent(customProps: Props) {
  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Do you want to logout?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            customProps.props.navigation.closeDrawer();
            customProps.logout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...customProps.props}>
      <DrawerItemList {...customProps.props} />
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ fontSize: 16, color: "red" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const HomeScreen = () => {
  const [token, loading, error] = useCheckToken();

  function logout() {
    useLogout();
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent props={props} logout={logout} />
      )}
    >
      <Drawer.Group>
        <Drawer.Screen
          name="Dashboard"
          component={WelcomeComponent}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Counters"
          component={CountersScreen}
        ></Drawer.Screen>
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default HomeScreen;
