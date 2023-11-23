// dimensions.ts
import { Dimensions } from 'react-native';

// define all the dimensions used in the app
class SDims {
    screenHeight: number;
    screenWidth: number;
    
    Height5p: number;
    Height10p: number;
    Height20p: number; HeightTopSection: number;
    Height30p: number;
    Height40p: number;
    Height50p: number;
    Height60p: number;
    Height70p: number; HeightCentralSection: number;
    Height80p: number;
    Height90p: number;
    Height100p: number;
    Height1_3f: number;
    Height2_3f: number;
    Height1_4f: number;
    Height3_4f: number;
    
    Width5p: number;
    Width10p: number;
    Width20p: number;
    Width30p: number;
    Width40p: number;
    Width50p: number;
    Width60p: number;
    Width70p: number;
    Width80p: number;
    Width90p: number;
    Width100p: number;
    Width1_3f: number;
    Width2_3f: number;
    Width1_4f: number;
    Width3_4f: number;

    // initialise all dimensions
    constructor() {
        this.screenHeight = Dimensions.get('window').height;
        this.screenWidth = Dimensions.get('window').width;

        // initialise all properties
        this.Height5p = this.screenHeight * 0.05;
        this.Height10p = this.screenHeight * 0.1;
        this.Height20p = this.screenHeight * 0.2; this.HeightTopSection = this.screenHeight * 0.2;
        this.Height30p = this.screenHeight * 0.3;
        this.Height40p = this.screenHeight * 0.4;
        this.Height50p = this.screenHeight * 0.5;
        this.Height60p = this.screenHeight * 0.6;
        this.Height70p = this.screenHeight * 0.7; this.HeightCentralSection = this.screenHeight * 0.7;
        this.Height80p = this.screenHeight * 0.8;
        this.Height90p = this.screenHeight * 0.9;
        this.Height100p = this.screenHeight * 1;
        this.Height1_3f = this.screenHeight / 3;
        this.Height2_3f = (this.screenHeight / 3) * 2;
        this.Height1_4f = this.screenHeight / 4;
        this.Height3_4f = (this.screenHeight / 4) * 3;

        this.Width5p = this.screenWidth * 0.05;
        this.Width10p = this.screenWidth * 0.1;
        this.Width20p = this.screenWidth * 0.2;
        this.Width30p = this.screenWidth * 0.3;
        this.Width40p = this.screenWidth * 0.4;
        this.Width50p = this.screenWidth * 0.5;
        this.Width60p = this.screenWidth * 0.6;
        this.Width70p = this.screenWidth * 0.7;
        this.Width80p = this.screenWidth * 0.8;
        this.Width90p = this.screenWidth * 0.9;
        this.Width100p = this.screenWidth * 1;
        this.Width1_3f = this.screenWidth / 3;
        this.Width2_3f = (this.screenWidth / 3) * 2;
        this.Width1_4f = this.screenWidth / 4;
        this.Width3_4f = (this.screenWidth / 4) * 3;
    }
}

// Creating a singleton instance
const instance = new SDims();

// Exporting the singleton instance
export default instance;