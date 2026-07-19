# Maintainer: smtdfc <me.smtdfc@gmail.com>

_extension_name="bakeryos@bakeryos.smtdfc.space"
pkgname=bakeryos-gnome-extension
pkgver=9885229
pkgrel=1
pkgdesc="An extension for BakeryOS"
arch=('x86_64')
url="https://gitlab.com/bakeryos/bakeryos-gnome-extension"
license=('GPL-3.0-or-later')
depends=('gcc-libs' 'glibc' 'pacman')
arch=('any')
source=()
sha256sums=()

pkgver() {
    git describe --long --tags --always | sed 's/^v//;s/\([^-]*-g\)/r\1/;s/-/./g'
}

build() {
    cd $startdir
    make pack
}

package() {
   
   install -d "$pkgdir/usr/share/gnome-shell/extensions/$_extension_name"
   cp -r "$startdir/dist" "$pkgdir/usr/share/gnome-shell/extensions/$_extension_name"
   install -Dm644 "$startdir/LICENSE" "$pkgdir/usr/share/licenses/$pkgname/LICENSE"
}
