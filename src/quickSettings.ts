import GObject from 'gi://GObject';
import * as QuickSettings from 'resource:///org/gnome/shell/ui/quickSettings.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';


export const QuickSettingButton = GObject.registerClass(class QuickSettingButton extends QuickSettings.QuickToggle {
    _init(params: { title: string, iconName: string }) {
        super._init({
            title: _(params.title),
            iconName: params.iconName,
            toggleMode: false,
        });


        this.connect("clicked", () => {
            Main.notify('BakeryOS', 'Feature under development');
        });
    }
});

export const BakeryOSIndicator = GObject.registerClass(class BakeryOSIndicator extends QuickSettings.SystemIndicator {
    _init() {
        super._init();
        this._add_qs_item(new QuickSettingButton({
            title: "BakeryOS Center",
            iconName: "settings"
        }));
    }

    _add_qs_item(item: any) {
        this.quickSettingsItems.push(item);
    }


    destroy() {
        this.quickSettingsItems.forEach(item => item.destroy());
        super.destroy();
    }
});