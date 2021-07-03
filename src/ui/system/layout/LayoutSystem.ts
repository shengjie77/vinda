import { View } from 'src/ui/view'

export class LayoutSystem {
  public static create() {
    return new LayoutSystem()
  }

  // TODO: delete later
  public addView(v: View) {
    this._views.push(v)
  }

  public build(): void {
    this._views.forEach((e) => e.layout())
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _views: View[] = []
}
