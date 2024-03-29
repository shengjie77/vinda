import { BackgroundStyle, CursorStyle, CursorType } from 'src/ui/style'
import { ButtonStylesheet } from 'src/ui/stylesheet'
import { Font } from 'src/base/font'
import { Color } from 'src/base/color'

import { FontSize } from './FontSize'
import { Palette } from './Palette'
import { FontFamily } from './FontFamily'

export class ButtonProvider {
  public get primaryNormalStyle(): ButtonStylesheet {
    const style = ButtonStylesheet.create()

    withFont(style)
    withNormalBackground(style)
    withTextColor(style)
    style.cursor = CursorStyle.create(CursorType.Pointer)
    style.border.radius = this.radius

    style.padding.update({
      horizontal: 16,
      vertical: 0,
    })

    return style
  }

  public get primaryHoverStyle(): ButtonStylesheet {
    const style = ButtonStylesheet.create()
    this.updateFont(style)
    style.cursor = CursorStyle.create(CursorType.Pointer)
    style.text.color = Color.fromHex(Palette.White)
    style.background.color = Color.fromHex(this.primaryHoverColor)
    style.border.radius = this.radius
    style.padding.update({
      horizontal: 16,
      vertical: 0,
    })

    return style
  }

  public get primaryActiveStyle(): ButtonStylesheet {
    const style = ButtonStylesheet.create()
    this.updateFont(style)
    style.cursor = CursorStyle.create(CursorType.Pointer)
    style.text.color = Color.fromHex(Palette.White)
    style.background.color = Color.fromHex(0x005a9e)
    style.border.radius = this.radius
    style.padding.update({
      horizontal: 16,
      vertical: 0,
    })

    return style
  }

  public get primaryDisabledStyle(): ButtonStylesheet {
    const style = ButtonStylesheet.create()
    this.updateFont(style)
    style.cursor = CursorStyle.create(CursorType.Default)
    style.text.color = Color.fromRGB(210, 208, 206)
    style.background.color = Color.fromRGB(243, 242, 241)
    style.border.radius = this.radius
    style.padding.update({
      horizontal: 16,
      vertical: 0,
    })

    return style
  }

  private updateFont(style: ButtonStylesheet) {
    const font = Font.create()
    font.family = FontFamily.Default
    font.size = FontSize.S14
    font.lineHeight = FontSize.S14

    style.text.font = font
  }

  private readonly radius: number = 2
  private readonly primaryHoverColor: number = 0x0f6ebe
}

function withNormalBackground(style: ButtonStylesheet) {
  const bg = BackgroundStyle.create()
  bg.color = Color.fromHex(Palette.CyanBlue10)
  style.background = bg
}

function withFont(style: ButtonStylesheet) {
  const font = Font.create()
  font.family = FontFamily.Default
  font.size = FontSize.S14
  font.lineHeight = FontSize.S14

  style.text.font = font
}

function withTextColor(style: ButtonStylesheet) {
  style.text.color = Color.fromHex(Palette.White)
}
