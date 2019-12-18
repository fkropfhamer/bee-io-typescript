export default abstract class AssetLoader {
    private static loadImage(name: string, url: string): Promise<ILoadedImageObject> {
      return new Promise((resolve) => {   
            const asset: HTMLImageElement = new Image();
            asset.src = url;
            asset.onload = () => resolve({ name, asset });  
      });
    }

    private static loadAudio(name: string, url: string): Promise<ILoadedAudioObject> {
        return new Promise((resolve) => {
            const asset: HTMLAudioElement = new Audio(url);
            asset.onloadeddata = () => resolve({ name, asset });
        })
    }
  
    static loadImages(imagesToLoad: IAssetObject[]): Promise<{}> {
      return this.loadAssets(imagesToLoad, this.loadImage);
    }

    static loadAudios(audiosToLoad: IAssetObject[]): Promise<{}> {
        return this.loadAssets(audiosToLoad, this.loadAudio);
    }

    private static loadAssets(assetsToLoad: IAssetObject[], assetLoadFunction: (name: string, url: string) => Promise<ILoadedAssetObject>): Promise<{}> {
      return Promise.all(assetsToLoad.map((asset) => assetLoadFunction(asset.name, asset.url)))
        .then((assets: ILoadedAssetObject[]) =>
          assets.reduceRight((acc, elem) => {
            return { ...acc, [elem.name]: elem.asset };
          }, {})
        )
        .catch(() => {
          throw new Error('Not all assets could be loaded.');
        });
    }
}

interface IAssetObject {
    name: string;
    url: string;
}

interface ILoadedAssetObject {
    name: string;
    asset: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
}

interface ILoadedImageObject extends ILoadedAssetObject {
    asset: HTMLImageElement;
}

interface ILoadedAudioObject extends ILoadedAssetObject {
    asset: HTMLAudioElement;
}

  