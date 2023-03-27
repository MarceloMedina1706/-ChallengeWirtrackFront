export class PronosticoDTO{
    id: number;
    description: string;
    icon: string;

  constructor(
    id: number,
    description: string,
    icon: string
  ) {
    this.id = id;
    this.description = description;
    this.icon = icon;
  }
}