function newNavbarItem(text, url) {
  const itemLink = document.createElement('a');
  itemLink.className = 'nav-item nav-link';
  itemLink.innerHTML = text;
  itemLink.href = url;

  return itemLink
}

function renderNavbar(user) {
  const navbarDiv = document.getElementById('nav-item-container');

  navbarDiv.appendChild(newNavbarItem('Home', '/'));
  navbarDiv.appendChild(newNavbarItem('About', '/about'));
  navbarDiv.appendChild(newNavbarItem('Gallery', '/gallery'));
  if (user._id !== undefined) {
    navbarDiv.appendChild(newNavbarItem(user_.id, '/u/profile?'+user._id)); //changed to just being the username
    navbarDiv.appendChild(newNavbarItem('Logout', '/logout'));
  } else {
    navbarDiv.appendChild(newNavbarItem('Login', '/auth/google'));
    //what about sign up
  }
}
