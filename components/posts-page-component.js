import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, token } from "../main.js";
import { dislike, like, deletePost } from "../api.js";
import { user } from "../main.js";

import { formatRelativeTime } from "../lib/formatDate/formatDate.js";

export function renderPostsPageComponent({ singleUserMode }) {
  console.log("Актуальный список постов:", posts);

  // const country = "ru"; оставить значение?????????????777
  const appElement = document.getElementById("app");
  const appEl = posts
    .map((post) => {
      if (singleUserMode) {
        console.log(post);
      }
      return `
    <li class="post" id='post-${post.id}'>
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" data-liked="${
        post.isLiked
      }" class="like-button" data-index='${post.user.id}'>
          <img src="./assets/images/${
            post.isLiked ? "like-active" : "like-not-active"
          }.svg">
        </button>
        <p class="post-likes-text">Нравится: <strong>${
          post.likes.length
        }</strong></p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p>Пост добавлен: ${formatRelativeTime(post.created_at)}</p>
      <div class="bin">
      <button class="delete-button" data-post-id="${
        post.id
      }"><img src="./assets/images/bin.svg" alt="Удалить"></button>
      <p class="post-delete-text"><strong>Удалить пост</strong></p>
      </div>
    </li>`;
    })
    .join("");

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">${appEl}</ul>
              </div>`;

  appElement.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  initLikeListener(singleUserMode);
  initDeleteListener();
}

function initLikeListener() {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonElements) {
    likeButton.addEventListener("click", () => {
      const postId = likeButton.dataset.postId;
      const isLiked = likeButton.dataset.liked === "true";
      const likeAction = isLiked ? dislike : like;
      const token = getToken();

      // Проверяем, есть ли токен авторизации
      if (!token) {
        alert("Пожалуйста, войдите в систему, чтобы ставить лайки");
        return; // Прерываем выполнение функции, если пользователь не авторизован
      }

      likeAction({ id: postId, token })
        .then(() => {
          // Переключаем состояние лайка
          likeButton.dataset.liked = !isLiked;
          // Обновляем изображение кнопки лайка
          const likeImage = likeButton.querySelector("img");
          likeImage.src = `./assets/images/${
            !isLiked ? "like-active" : "like-not-active"
          }.svg`;
          // Обновляем количество лайков
          const likesTextElement = likeButton.nextElementSibling;
          const likesCount = parseInt(
            likesTextElement.textContent.match(/\d+/)[0],
            10
          );
          likesTextElement.textContent = `Нравится: ${
            isLiked ? likesCount - 1 : likesCount + 1
          }`;
        })
        .catch((error) => {
          console.error(error);
          alert("Не удалось обновить лайк");
        });
    });
  }
}

// удалить все посты, даже не автора--------------------------------------------------------
function initDeleteListener() {
  const deleteButtonElements = document.querySelectorAll(".delete-button");
  for (const deleteButton of deleteButtonElements) {
    deleteButton.addEventListener("click", () => {
      const postId = deleteButton.dataset.postId;
      deletePost({ id: postId, token: getToken() })
        .then(() => {
          const postElement = document.getElementById("post-" + postId);
          if (postElement) {
            postElement.remove();
          }
          console.log("Пост с ID {postId} удален");
        })
        .catch((error) => {
          console.error(error);
          alert("Войдите в систему, чтобы удалить пост");
        });
    });
  }
}
