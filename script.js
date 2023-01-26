const ul = document.querySelector("ul"),
  input = ul.querySelector("input"),
  count = document.querySelector(".details span");
let maxTags = 10;
let tags = [];

const countTag = () => {
  input.focus();
  //subtracting max value with tags length
  count.innerText = maxTags - tags.length;
};

const createTag = () => {
  //removing all li tags before adding so there will be no duplicates
  ul.querySelectorAll("li").forEach((li) => li.remove());
  // console.log(tags.slice().reverse());
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this,'${tag}')"></i></li>`;
      //inserting or adding li inside ul tag
      ul.insertAdjacentHTML("afterbegin", liTag);
    });
  countTag();
};

const remove = (element, tag) => {
  //getting removing tag index
  let index = tags.indexOf(tag);
  //removing or excluding selected tag from an array
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  //removing li of removed tag
  element.parentElement.remove();
  countTag();
  console.log(tags);
  console.log(element, tag);
};

const addTag = (e) => {
  if (e.key == "Enter") {
    //removing unwanted spaces from user tag
    let tag = e.target.value.replace(/\s+/g, "");

    //if the tag length is greater than 1 and the tag isn't exists already
    if (tag.length > 1 && !tags.includes(tag)) {
      //splitting each tag from comma(,)
      //if tags length is less than 10 then only add tag
      if (tags.length < 10) {
        tag.split(",").forEach((tag) => {
          //adding each tag inside array
          tags.push(tag);
          createTag();
        });
      }
    }
    e.target.value = "";
    // console.log(e.target.value);
  }
};

input.addEventListener("keyup", addTag);

const removeBtn = document.querySelector("button");

removeBtn.addEventListener("click", () => {
  //making array empty
  tags.length = 0;
  count.innerText = 0;
  input = ul.querySelector("input");
  //removing all li tags
  ul.querySelectorAll("li").forEach((li) => li.remove());
});
