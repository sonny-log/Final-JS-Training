const MAX_CARD_WRAP = 3;

function main() {
  load_data((data) => {
    set_now(0);
    //set_now(2);
    set_data({ list: sort_data(data), size: data.size, max: data.max });
    display_body(get_data(), get_now());
  });
}

function display_body(data, now) {
  const content = document.getElementById('content');
  const indicator = document.getElementById('indicator');
  create_content(content, now, data.max);
  create_indicator(indicator, data, now);
  update_card_content(data.list, now, data.max);
  add_touch_event(content, indicator, data);
  //add_drag_event(content, data.max);
  add_drag_event2(data.list);
}

function create_content(content, now, max) { // create
  const size = get_page_size();
  let html = '';
  for (let i = 0; i < MAX_CARD_WRAP; i++) {
    html += `<div class='box_wrap'><div id='card_wrap_` + i + `'>`;
    html += create_card(i, size, now, max);
    html += '</div></div>';
  }
  content.innerHTML = html;
  content.style.transform = 'translateX(' + -content.clientWidth + 'px)';
}

function create_card(i, size, now, max) {
  let html = '';
  for (let j = 0; j < max; j++) {
    let item_wrap = get_item_wrap(i, size, now);
    let item_card = get_item_card(j);
    //<div class="card" id="card_` + item_wrap + `_` + item_card + `"></div>
    html +=
      `
      <div class="card">
      <div class="image"></div>
      <div class="text"> ` + (item_wrap + 1) + `_` + item_card + ` </div>
      </div>
    `;
  }
  return html;
}

function add_drag_event2(list) {
  //let dragging_card;
  const cards = document.querySelectorAll('.card');

  let drag_card_id;
  let drag_card_img;
  let drag_card_txt;
  let drag_card_div;

  let drop_card_id;
  let drop_card_img;
  let drop_card_txt;
  let drop_card_div;

  cards.forEach(card => {
    card.children[0].addEventListener('dragstart', (e) => {
      //drag_card_id = card.id;
      //drag_card_img = card.children[0].style.backgroundImage;
      //drag_card_txt = card.children[1].style.innerHTML;
      //drag_card_div = card;
      e.dataTransfer.setData('Text', card.children[0].style.backgroundImage);

      card.children[0].classList.add('dragging');
      //dragging_card = card;
    })
    card.children[0].addEventListener('dragover', (e) => {
      console.log('dragover item :' + card.children[0].style.backgroundImage);
      e.preventDefault();
    })
    card.children[0].addEventListener('drop', (e) => {
      let data = e.dataTransfer.getData('Text');
      e.target.style.backgroundImage = data;
      // e.preventDefault();
      /*
            drop_card_id = card.id;
            drop_card_img = card.children[0].style.backgroundImage;
            drop_card_txt = card.children[1].style.innerHTML;
            drop_card_div = card;
            //console.log('drop :drag: ', drag_card_id, ', ', drag_card_img, ', ', drag_card_txt, ', ', drag_card_div);
            //console.log('drop :drop: ', drop_card_id, ', ', drop_card_img, ', ', drop_card_txt, ', ', drop_card_div);
      
            if (drop_card_div.children[0].style.backgroundImage == 'unset') {
              drop_card_div.style.backgroundImage = 'unset';
              drop_card_div.children[0].style.backgroundImage = drag_card_img;
              drop_card_div.children[0].setAttribute('draggable', true);
      
              drag_card_div.style.backgroundImage = 'url("img/plus.png")';
              drag_card_div.children[0].style.backgroundImage = 'unset';
              drag_card_div.children[0].setAttribute('draggable', false);
            } else {
              drop_card_div.children[0].style.backgroundImage = drag_card_img;
              drag_card_div.children[0].style.backgroundImage = drop_card_img;
            }
      */
      /* 
      drop_card_div.style.backgroundImage = 'unset';
      drop_card_div.children[0].style.backgroundImage = drag_card_img;
      drop_card_div.children[0].setAttribute('draggable', false);


      drag_card_div.style.backgroundImage = 'url("img/plus.png")';
      drag_card_div.children[0].style.backgroundImage = 'unset';
      drag_card_div.children[0].setAttribute('draggable', true); */


      //console.log('drop :drag_card_img: ', drag_card_img, ', typeof: ', typeof drag_card_img);
      //console.log('drop :drag_card_div.children[0]: ', drag_card_div.children[0], ', typeof: ', typeof drag_card_div.children[0]);

      console.log('drop item :' + card.children[0].style.backgroundImage);

      /*
      dragging_card.children[0].style.backgroundImage = card.children[0].style.backgroundImage;
      //console.log('Before drop item : ' + card.children[0].style.backgroundImage);
      if (card.style.backgroundImage === 'url("img/plus.png")') {
        card.style.backgroundImage = 'unset';
        card.children[0].setAttribute('draggable', true);
        dragging_card.style.backgroundImage = 'url("img/plus.png")';
        dragging_card.style.backgroundSize = '50% 50%';
        dragging_card.children[0].setAttribute('draggable', false);
      }
      let data = e.dataTransfer.getData('Text');
      card.children[0].style.backgroundImage = data;
      */
      //console.log('⭐: ' + card.children[0].style.backgroundImage);
    })
    card.children[0].addEventListener('dragend', (e) => {
      //console.log('dragend :drag: ', drag_card_id, ', ', drag_card_img, ', ', drag_card_txt, ', ', drag_card_div);
      //console.log('dragend :drop: ', drop_card_id, ', ', drop_card_img, ', ', drop_card_txt, ', ', drop_card_div);
      console.log('dragend item :' + card.children[0].style.backgroundImage);
      card.children[0].classList.remove('dragging');

      //card.children[0].style.backgroundImage = 'unset';
      //card.children[0].style.backgroundImage = drop_card_img;
    })
  })
}

function get_item_wrap(i, size, now) {
  let k = now + i - 1;
  if (k < 0) {
    k = size;
  }
  if (k > size) {
    k = 0;
  }
  return k;
}

function get_item_card(j) {
  return j;
}

function get_item_base(list, item_wrap, item_card) {
  //console.log('card_' + item_wrap + '_' + item_card);
  for (let k = 0; k < list.length; k++) {
    if (item_wrap == list[k].wrap && item_card == list[k].card) {
      //console.log(list[k], list.length);
      return list[k];
    }
  }
  return null;
}

function update_card_content(list, now, max) { // update 
  //console.log('now: ' + now + ', max: ' + max + ', list: ', list);
  const size = get_page_size();
  for (let i = 0; i < MAX_CARD_WRAP; i++) {
    const card_wrap = document.querySelector('#card_wrap_' + i);

    for (let j = 0; j < max; j++) {
      let item_wrap = get_item_wrap(i, size, now);
      let item_card = get_item_card(j);
      let card_id = 'card_' + item_wrap + '_' + item_card;

      const card = card_wrap.children[j];

      if (card) {
        const item = get_item_base(list, item_wrap, item_card);
        if (item) {
          card.setAttribute('id', card_id);
          card.style.backgroundImage = 'unset';
          card.children[0].setAttribute('draggable', true);
          card.children[0].style.backgroundImage = 'url(' + item.img + ')';
          card.children[1].innerHTML = item.txt;
        } else {
          card.setAttribute('id', card_id);
          card.style.backgroundImage = 'url("img/plus.png")';
          card.children[0].setAttribute('draggable', false);
          card.children[0].style.backgroundImage = 'unset';
          card.children[1].innerHTML = (item_wrap + 1) + '_' + item_card;
        }
      } else {
        console.error('error card is null!!');
      }
    }
  }
}


function create_indicator(indicator, data, now, items) { // create
  const size = get_page_size() + 1;
  let html = '';

  for (let i = 0; i < size; i++) {
    if (i === now) {
      //html += `<div class="active" onclick="click_indicator(` + i + `)">` + (i + 1) + `</div>`;
      html += `<div class="active">` + (i + 1) + `</div>`;
    } else {
      //html += `<div class="" onclick="click_indicator(` + i + `)">` + (i + 1) + `</div>`;
      html += `<div class="">` + (i + 1) + `</div>`;
    }
  }
  indicator.innerHTML = html;

  for (let j = 0; j < size; j++) {
    indicator.children[j].onclick = () => {
      console.log('[6]click_indicator', j);
      click_indicator(j, data, indicator, items);
    }
  }
}

function update_indicator(now, dir, indicator) {
  update_now(now, dir, get_page_size());
  //let indicator = document.getElementById('indicator');
  let len = indicator.children.length;
  for (let i = 0; i < len; i++) {
    if (i === get_now()) {
      indicator.children[i].classList.add('active');
    } else {
      indicator.children[i].classList.remove('active');
    }
  }
}

function click_indicator(now, data, indicator, items) { // update
  //let data = get_data();
  update_indicator(now, 0, indicator);
  update_card_content(data.list, now, data.max);
}

function add_touch_event(content, indicator, data, items) {
  let stx = 0;
  let edx = 0;
  let x = 0;
  let now = 0;
  content.addEventListener('touchstart', (e) => {
    now = get_now();
    stx = e.touches[0].clientX;
    content.style.transitionDuration = '0s';
  });
  content.addEventListener('touchmove', (e) => {
    x = (-content.clientWidth) + (e.touches[0].clientX - stx);
    content.style.transform = 'translateX(' + x + 'px)';
  })
  content.addEventListener('touchend', (e) => {
    edx = e.changedTouches[0].clientX;
    //content.style.transitionDuration = '0.5s';
    stx < edx ? prev_page(content, indicator, now, -1, 0) : next_page(content, indicator, now, +1, 2);
  });
  content.ontransitioncancel = () => {
    content.style.transitionDuration = '0s';
  };
  content.ontransitionend = () => {
    console.log('[2]change_content');

    let idx = get_now();
    update_card_content(data.list, idx, data.max);
    content.style.transitionDuration = '0s';
    content.style.transform = 'translateX(' + -content.clientWidth + 'px)';
  };
}

function prev_page(content, indicator, now, dir, offset) {
  update_indicator(now, dir, indicator);
  animate_slide(content, offset);
}

function next_page(content, indicator, now, dir, offset) {
  update_indicator(now, dir, indicator);
  animate_slide(content, offset);
}

function animate_slide(content, offset) {
  console.log('[1]slide');
  const pos = content.clientWidth * offset;
  content.style.transitionDuration = '0.5s';
  content.style.transform = 'translateX(' + (-pos) + 'px)';
}

function unload_test() {
  console.log('unload_test');
}
