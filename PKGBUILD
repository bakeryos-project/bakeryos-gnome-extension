# Maintainer: smtdfc <me.smtdfc@gmail.com>

_extension_name="bakeryos@bakeryos.smtdfc.space"
pkgname=bakeryos-gnome-extension
pkgver=1.0.0
pkgrel=1
pkgdesc="An extension for BakeryOS"
arch=('x86_64')
url="https://gitlab.com/bakeryos/bakeryos-gnome-extension"
license=('GPL-3.0-or-later')
depends=('gcc-libs' 'glibc' 'pacman')
arch=('any')
source=()
sha256sums=()


build() {
    cd $startdir
    make pack
}

package() {
   
   install -d "$pkgdir/usr/share/gnome-shell/extensions/$_extension_name"
   cp -r "$startdir/dist/"* "$pkgdir/usr/share/gnome-shell/extensions/$_extension_name"
   install -Dm644 "$startdir/LICENSE" "$pkgdir/usr/share/licenses/$pkgname/LICENSE"
}
