const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const answer10 = 10;
var select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calcResult() {
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
  let point = calcResult();

  // 아이스크림 이름
  const resultName = document.querySelector(".resultname");
  resultName.innerHTML = infoList[point].name;

  //결과 이미지
  var resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  var imgURL = "img/image-" + point + ".jpg";
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  //다시할때 그 전 이미지 none
  const btn = document.querySelector(".btn");
  btn.addEventListener("click", setretry);
  function setretry() {
    resultImg.style.display = "none";
  }

  // 결과 설명
  const resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[point].desc;
}

function yourResult() {
  qna.style.display = "none";
  result.style.display = "block";
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function () {
    var children = document.querySelectorAll(".answerList");

    var target = qnaList[qIdx].a[idx].type;
    for (let i = 0; i < target.length; i++) {
      select[target[i]] += 1;
    }

    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.display = "none";
    }
    nextLevel(++qIdx);
    console.log(target);
    console.log(select);
  });
}

function nextLevel(qIdx) {
  if (qIdx === answer10) {
    yourResult();
    return;
  }

  function yourResult() {
    qna.style.display = "none";
    result.style.display = "block";
    setResult();
  }

  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / answer10) * (qIdx + 1) + "%";
}

const begin = document.querySelector(".begin");
begin.onclick = () => {
  main.style.display = "none";
  qna.style.display = "block";
  let qIdx = 0;
  nextLevel(qIdx);
};

const retry = document.querySelector(".retry");
retry.onclick = () => {
  select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  result.style.display = "none";
  main.style.display = "block";
};

// 랭킹보기
const lankopen = document.querySelector(".lankopen");
const lankclose = document.querySelector(".lankclose");
const lankBG = document.querySelector(".lankBG");

lankopen.onclick = () => {
  lankBG.style.display = "flex";
};

lankclose.onclick = () => {
  lankBG.style.display = "none";
};
