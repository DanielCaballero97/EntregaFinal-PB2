export class UserResponseDto {
  constructor(user){

    this.first_name = user.first_name;

    this.last_name = user.last_name;

    this.cart = user.cart;

    this.full_name = `${user.first_name} ${user.last_name}`
    
  }
}