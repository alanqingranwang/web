// @flow
const getContactHref = (name: string, contact: string) => {
  let href;

  switch (name) {
    case 'linkedin':
      href = `https://linkedin.com/in/${contact}`;
      break;
    case 'github':
      href = `https://github.com/${contact}`;
      break;
    case 'email':
      href = `mailto:${contact}`;
      break;
    default:
      href = contact;
      break;
  }

  return href;
};

export default getContactHref;
