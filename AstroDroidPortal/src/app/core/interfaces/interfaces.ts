export interface ISprite {
  currentBehavior: ISpriteBehavior | undefined;
  start(): void;
  update(): void;
  finish(): void;
}

export interface ISpriteBehavior {
  start(sprite: ISprite): void;
  update(sprite: ISprite): void;
  finish(sprite: ISprite): void;
}
