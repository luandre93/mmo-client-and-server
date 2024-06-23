export default class Controller {
    constructor(dsm) {
        this.dsm = dsm;
    }

    ControllerStart = () => {
        this.dsm.onDeviceConnectedObservable.add((device) => {
            switch (device.deviceType) {
                case BABYLON.DeviceType.Keyboard:
                    break;
            }
        });
    }
}



