# Maintainer: smtdfc <me.smtdfc@gmail.com>
pkgname=bakeryos-gnome-extension
pkgver=1.0.0
pkgrel=1
pkgdesc=""
arch=('x86_64')
url="https://gitlab.com/bakeryos/bakeryos-gnome-extension"
license=('GPL-3.0-or-later')
depends=('gcc-libs' 'glibc' 'pacman')
source=()
sha256sums=()

package() {
   install -Dm755 "$startdir/dist" "$pkgdir/usr/share/gnome-shell/extensions"
   install -Dm644 "$startdir/LICENSE" "$pkgdir/usr/share/licenses/$pkgname/LICENSE"
}