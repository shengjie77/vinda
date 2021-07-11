import { ButtonStylesheet } from 'src/ui/style/ButtonStysheet'
import { Font } from 'src/common/font'
import { Color } from 'src/common/color'

import { FontSize } from './FontSize'
import { Palette } from './Palette'
import { ButtonProvider } from './ButtonProvider'

export class FluentDesignTheme {
  readonly fontFamily: string = 'PingFang SC'

  public button: ButtonProvider = new ButtonProvider()
}
