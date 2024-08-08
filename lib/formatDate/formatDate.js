// <p class="post-date">${formatDistanceToNow(new Date(post.createdAt), {locale: ru})} назад</p>

//   /**
//    * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
//    * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
//    */

// Файл lib/formatDate/formatDate.js

// Приводим дату к формату ДД/ММ/ГГГГ ЧЧ:ММ
// export const formatDateToRu = (date) => {
//   return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
//     date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
//   }/${date.getFullYear()} ${
//     date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
//   }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
// };

// // Приводим дату к формату ММ-ДД-ГГГГ ЧЧ:ММ
// export const formatDateToUs = (date) => {
//   return `${
//     date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
//   }-${
//     date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
//   }-${date.getFullYear()} ${
//     date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
//   }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
// };


import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
};