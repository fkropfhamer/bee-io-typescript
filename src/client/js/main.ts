import AssetLoader  from "./assetloader"
import * as bee01 from "../assets/bee01.png";
import * as backgroundImage from "../assets/waben001.png";
import * as backgroundMusic01 from "../assets/Six_Umbrellas_-_07_-_Asset_House.mp3";

window.onload = () => {
    Promise.all([
        AssetLoader.loadAudios([{name: "backgroundMusic01", url: backgroundMusic01.default}]), 
        AssetLoader.loadImages([
            {name: "bee01", url: bee01.default},
            {name: "backgroundImage", url: backgroundImage.default},

        ])
    ]).then((assets) => {
        const audios = assets[0];
        const images = assets[1];
        console.log(images, audios);
    })
}
