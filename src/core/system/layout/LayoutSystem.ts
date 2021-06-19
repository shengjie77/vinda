import { LayoutEntity } from './LayoutEntity'

export class LayoutSystem {
  public static create() {
    return new LayoutSystem()
  }

  public addEntity(e: LayoutEntity) {
    this.#entities.push(e)
  }

  public build(): void {
    this.#entities.forEach((e) => e.layout())
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  #entities: LayoutEntity[] = []
}
