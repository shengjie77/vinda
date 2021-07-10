import { ButtonStylesheet } from 'src/ui/style/ButtonStysheet'
import { Font } from 'src/common/font'
import { Color } from 'src/common'

enum FontSize {
  S68 = 68,
  S42 = 42,
  S32 = 32,
  S28 = 28,
  S24 = 24,
  S20 = 20,
  S18 = 18,
  S16 = 16,
  S14 = 14,
  S12 = 12,
  S10 = 10,
}

enum Palette {
  White = 0xffffff,
  CyanBlue10 = 0x0078d4,
}

export class FluentDesignTheme {
  readonly fontFamily: string = 'PingFang SC'

  public get buttonPrimaryStyle(): ButtonStylesheet {
    const style = ButtonStylesheet.create()

    const font = Font.create()
    font.family = this.fontFamily
    style.text.font = font
    style.text.font.size = FontSize.S14
    style.text.font.lineHeight = FontSize.S14
    style.text.color = Color.fromHex(Palette.White)

    style.background.color = Color.fromHex(Palette.CyanBlue10)
    style.border.radius = 2

    style.padding.update({
      horizontal: 16,
      vertical: 0,
    })

    return style
  }
}
