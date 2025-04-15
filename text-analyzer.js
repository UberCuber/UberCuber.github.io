document.addEventListener('DOMContentLoaded', () => {
  // === DOM Elements ===
  const textInput = document.getElementById('textInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultsSection = document.getElementById('results');

  const WORD_LISTS = {
    pronouns: [
      'he', 'hers', 'you', 'everything', 'everybody', 'itself', 'his', 'who',
      'which', 'ourselves', 'they', 'yourselves', 'that', 'yourself', 'anybody',
      'someone', 'any', 'mine', 'we', 'him', 'herself', 'myself', 'i', 'these',
      'some', 'this', 'them', 'few', 'each', 'their', 'something', 'themselves',
      'me', 'anyone', 'nothing', 'she', 'our', 'nobody', 'himself', 'your', 'its',
      'those', 'all', 'one', 'what', 'my', 'everything', 'no one', 'us', 'either',
      'whom', 'somebody', 'ours', 'it', 'anyone', 'some'
    ],
    prepositions: [
      'across', 'concerning', 'before', 'besides', 'on', 'after', 'under',
      'beneath', 'outside', 'by', 'beside', 'over', 'at', 'round', 'since',
      'considering', 'in', 'throughout', 'without', 'through', 'among',
      'around', 'towards', 'off', 'during', 'into', 'except', 'down', 'over',
      'past', 'from', 'up', 'underneath', 'with', 'about', 'excluding',
      'amid', 'onto', 'until', 'regarding', 'near', 'behind', 'to', 'out',
      'like', 'of', 'between', 'inside', 'across', 'for', 'above', 'against',
      'despite'
    ],
    articles: ['the', 'a', 'an']
  };

  function analyzeText() {
    const text = textInput.value.trim();
    if (!text) {
      alert("Please enter some text to analyze.");
      return;
    }

    displayBasicStats(text);
    displayWordCategoryCounts(text);
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function displayBasicStats(text) {
    setStat('letterCount', countMatches(text, /[a-zA-Z]/g));
    setStat('wordCount', text.split(/\s+/).filter(Boolean).length);
    setStat('spaceCount', countMatches(text, /\s/g));
    setStat('newlineCount', countMatches(text, /\n/g));
    setStat('specialCount', countMatches(text, /[^a-zA-Z0-9\s]/g));
  }

  function setStat(elementId, value) {
    document.getElementById(elementId).textContent = value;
  }

  function countMatches(text, regex) {
    return (text.match(regex) || []).length;
  }

  function displayWordCategoryCounts(text) {
    const words = (text.toLowerCase().match(/\b\w+\b/g) || []);

    fillWordTable('pronounsTable', countCategory(words, WORD_LISTS.pronouns));
    fillWordTable('prepositionsTable', countCategory(words, WORD_LISTS.prepositions));
    fillWordTable('articlesTable', countCategory(words, WORD_LISTS.articles));
  }

  function countCategory(words, categoryList) {
    const counts = {};
    categoryList.forEach(word => counts[word] = 0);
    words.forEach(word => {
      if (counts.hasOwnProperty(word)) counts[word]++;
    });

    return Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function fillWordTable(tableId, wordCounts) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';

    if (wordCounts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="2" style="text-align: center;">No matches found</td></tr>`;
      return;
    }

    wordCounts.forEach(([word, count]) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${word}</td><td>${count}</td>`;
      tbody.appendChild(row);
    });
  }

  analyzeBtn.addEventListener('click', analyzeText);
  textInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      analyzeText();
    }
  });
});
