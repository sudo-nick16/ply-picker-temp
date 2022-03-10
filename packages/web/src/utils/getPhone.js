const getPhone = (phone) => {
  if (phone.startsWith("+91")) {
    return phone.slice(3);
  }else{
      return phone;
  }
};
export default getPhone;
