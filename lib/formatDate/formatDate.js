// <p class="post-date">${formatDistanceToNow(new Date(post.createdAt), {locale: ru})} назад</p>
//   /**
//    * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
//    * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
//    */
// Файл lib/formatDate/formatDate.js

// import { formatDistanceToNow } from "date-fns";
// import { ru } from "date-fns/locale";

// export const formatRelativeTime = (date) => {
//   return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
// };


import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatRelativeTime = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "Некорректная дата";  // Если дата некорректная, возвращаем сообщение об ошибке
  }

  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
};