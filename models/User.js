class User {
  constructor(
    id,
    fullName,
    email,
    password,
    profileImage = "",
    favorites = []
  ) {
    this.id = id;
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.profileImage = profileImage;
    this.favorites = favorites;
  }
}
