// Start with first post.
let counter = 0;

// Load posts 20 at a time.
const quantity = 10;

//variable declaring if all the database entries have been loaded
let complete = false;

// When DOM loads, render the first 20 posts.
document.addEventListener('DOMContentLoaded', load);

// If scrolled to bottom, load the next 20 posts.
window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) { //if at the bottom of the page, load the next 10 posts
    if (!complete){
      complete = load(complete); //only carries out load when there are more
    }
  }
};

// Load next set of posts.
function load(finished) {

  // Set start and end post numbers, and update counter.
  const start = counter;
  const end = start + quantity - 1;
  counter = end + 1;

  finished = renderTreeCards(start, end, finished);
  return finished;
};

function treeDOMObject(treeJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', treeJSON._id);
  card.className = 'tree-card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const titleSpan = document.createElement('a');
  titleSpan.className = 'tree-title';
  titleSpan.innerHTML = treeJSON.creator_name + "'s Tree";
  cardBody.appendChild(titleSpan);

  // add image or graphic? maybe mini - vr? unclear exactly how to render many trees in AR/VR

  const buttonDiv = document.createElement('div')
  buttonDiv.className = 'tree-button-div row mt-4'
  cardBody.appendChild(buttonDiv)

  const renderARButtonDiv = document.createElement('div')
  renderARButtonDiv.className = 'col-6'
  const renderARButton = document.createElement('div')
  renderARButton.className = 'card-button'
  renderARButton.innerHTML = '<a href="/tree-ar?' + treeJSON._id + '">AR</a>'
  renderARButtonDiv.appendChild(renderARButton)
  buttonDiv.appendChild(renderARButtonDiv)

  const renderVRButtonDiv = document.createElement('div')
  renderVRButtonDiv.className = 'col-6'
  const renderVRButton = document.createElement('div')
  renderVRButton.className = 'card-button'
  renderVRButton.innerHTML = '<a href="/tree-vr?' + treeJSON._id + '">VR</a>'
  renderVRButtonDiv.appendChild(renderVRButton)
  buttonDiv.appendChild(renderVRButtonDiv)

  return card;
}

function renderTreeCards(start, end, finished) {
  const treesDiv = document.getElementById('trees-container');
  get('/api/public-trees', {'public': true}, function(treesArr) {
      for (let i = 0; i < treesArr.length; i++) {
          const currentTree = treesArr[i];
          treesDiv.appendChild(treeDOMObject(currentTree));
      };
  });
  return finished; //Boolean variable that dictates whether or not all of the posts have been loaded 
};
