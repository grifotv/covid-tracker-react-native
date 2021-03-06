import {StackNavigationProp} from "@react-navigation/stack";
import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ScreenParamList} from "./ScreenParamList";
import UserService from "../core/user/UserService";
import i18n from "../locale/i18n"
import {gbFlag, svFlag, usFlag} from "../../assets";
import {RouteProp} from "@react-navigation/native";
import {colors} from "../../theme";

type Props = {
    navigation: StackNavigationProp<ScreenParamList, 'CountrySelect'>;
    route: RouteProp<ScreenParamList, 'CountrySelect'>;
};

const US_CODE = 'US';
const GB_CODE = 'GB';
const SV_CODE = 'SE';

export class CountrySelectScreen extends Component<Props, {}> {
    private userService = new UserService();

    constructor(props: Props) {
        super(props);
    }

    private selectCountry = async (countryCode: string) => {
        await this.userService.setUserCountry(countryCode);
        const {patientId} = this.props.route.params;

        const screenParams: any | null = () => {
            if (patientId != null) {
                return {patientId: patientId}
            } else {
                return null
            }
        };


        const screenName = () => {
            if (patientId != null) {
                return 'WelcomeRepeat'
            } else {
                return 'Welcome'
            }
        };

        this.props.navigation.reset({
            index: 0,
            routes: [{name: screenName(), params: screenParams()}],
        })
    };

    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{i18n.t("select-country")}</Text>
                <View style={styles.flagRow}>
                    <TouchableOpacity onPress={() => this.selectCountry(US_CODE)}>
                        <Image source={usFlag}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.selectCountry(GB_CODE)}>
                        <Image source={gbFlag}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.selectCountry(SV_CODE)}>
                        <Image source={svFlag}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.predict,
    },
    text: {
        color: colors.white,
        paddingBottom: 40,
        fontSize: 24,
    },
    flagRow: {
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        flexDirection: 'row',
    }
});
