import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

export async function getAllDecks(user) {
  const q = query(collection(db, "decks"), where("userId", "==", user.uid));
  const decksSnapshot = await getDocs(q);

  const allDecksData = [];

  decksSnapshot.forEach((doc) => {
    allDecksData.push({ id: doc.id, ...doc.data() });
  });

  return allDecksData;
}

export async function getAllDecksData(user) {
  const q = query(collection(db, "decks"), where("userId", "==", user.uid));
  const decksSnapshot = await getDocs(q);

  const allDecksData = [];

  decksSnapshot.forEach((doc) => {
    const deckId = doc.id;
    const deck = doc.data();
    const cards = [];

    deck.cards.forEach(async (card, index) => {
      const matterResult = matter(card.markdown);

      const content = matterResult.content.split("---");
      const processedContentArr = [];

      content.forEach(async (con) => {
        const processedContent = await remark().use(html).process(con);
        const contentHtml = processedContent.toString();
        processedContentArr.push(contentHtml.toString());
      });

      cards.push({
        contentHtml: processedContentArr,
        ...matterResult.data,
        contentMd: matterResult.content,
        reviews: card.reviews,
        originalId: index,
      });
    });

    allDecksData.push({
      deckId,
      title: deck.title,
      tags: deck.tags ? deck.tags : [],
      dbCards: deck.cards ? deck.cards : [],
      cards,
    });
  });

  return allDecksData;
}

export async function getDeckData(deckId) {
  let deckSnapshot;

  try {
    deckSnapshot = await getDoc(doc(db, "decks", deckId));
  } catch (err) {
    console.log(err);
    return null;
  }

  const deck = deckSnapshot.data();

  const cards = [];

  if (deck) {
    deck.cards.forEach(async (card, index) => {
      const matterResult = matter(card.markdown);

      const content = matterResult.content.split("---");
      const processedContentArr = [];

      content.forEach(async (con) => {
        const processedContent = await remark().use(html).process(con);
        const contentHtml = processedContent.toString();
        processedContentArr.push(contentHtml.toString());
      });

      cards.push({
        contentHtml: processedContentArr,
        ...matterResult.data,
        contentMd: matterResult.content,
        reviews: card.reviews,
        originalId: index,
      });
    });

    return {
      deckId,
      title: deck.title,
      tags: deck.tags ? deck.tags : [],
      dbCards: deck.cards ? deck.cards : [],
      cards,
    };
  } else return null;
}

export async function addCard(deckId, newCard) {
  try {
    const deckRef = doc(db, "decks", deckId);
    await updateDoc(deckRef, {
      cards: arrayUnion({ markdown: newCard, reviews: [] }),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function addDeck(newDeck) {
  try {
    const newDeckRef = await addDoc(collection(db, "decks"), newDeck);
    return newDeckRef.id;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function deleteDeck(deckId) {
  await deleteDoc(doc(db, "decks", deckId));
}

export async function deleteCard(deckId, card) {
  await updateDoc(doc(db, "decks", deckId), {
    cards: arrayRemove(card),
  });
}

export async function updateDeck(deckId, deckProps) {
  await updateDoc(doc(db, "decks", deckId), {
    ...deckProps,
  });
}

export async function updateCard(deck, cardId, newCard) {
  deck.dbCards[cardId].markdown = newCard;

  await updateDoc(doc(db, "decks", deck.deckId), {
    cards: deck.dbCards,
  });
}

export async function updateReviews(deck, cardId, wasCorrect) {
  const date = new Date();

  deck.dbCards[cardId].reviews = [
    ...deck.dbCards[cardId].reviews,
    { time: date.toLocaleString("en-GB"), wasCorrect },
  ];

  await updateDoc(doc(db, "decks", deck.deckId), {
    cards: deck.dbCards,
  });

  return deck.dbCards[cardId].reviews;
}

export async function moveCard(deckId, newDeckId, card) {
  await updateDoc(doc(db, "decks", deckId), {
    cards: arrayRemove(card),
  });

  await updateDoc(doc(db, "decks", newDeckId), {
    cards: arrayUnion(card),
  });
}

export async function copyCard(newDeckIds, card) {
  newDeckIds.forEach(async (newDeckId) => {
    await updateDoc(doc(db, "decks", newDeckId), {
      cards: arrayUnion(card),
    });
  });
}
