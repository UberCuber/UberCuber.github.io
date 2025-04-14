document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const results = document.getElementById('results');
    
    const pronouns = [
      'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself','it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves','they', 'them', 'their', 'theirs', 'themselves','who', 'whom', 'whose', 'which', 'what','this', 'that', 'these', 'those', 'anyone', 'anybody', 'anything', 'someone', 'somebody', 'something', 'everyone', 'everybody', 'everything','no one', 'nobody', 'nothing','each', 'either', 'neither', 'one', 'some', 'any', 'all', 'few', 'many', 'most'];
    
    const prepositions = [
      'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between', 'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during', 'except', 'excepting', 'excluding', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 'round', 'since', 'through', 'throughout', 'to', 'toward', 'towards', 'under', 'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'];
    
    const indefiniteArticles = ['a', 'an', 'the'];

    function analyzeText() {
      const text = textInput.value;
      
      if (!text.trim()) {
        alert("Please enter some text to analyze.");
        return;
      }
      

      performAnalysis(text);
      
      results.style.display = 'block';
      
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function performAnalysis(text) {
      const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
      const wordCount = text.trim().split(/\s+/).length;
      const spaceCount = (text.match(/\s/g) || []).length;
      const newlineCount = (text.match(/\n/g) || []).length;
      const specialCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
      

      document.getElementById('letterCount').textContent = letterCount;
      document.getElementById('wordCount').textContent = wordCount;
      document.getElementById('spaceCount').textContent = spaceCount;
      document.getElementById('newlineCount').textContent = newlineCount;
      document.getElementById('specialCount').textContent = specialCount;
      
      const words = text.toLowerCase().match(/\b\w+\b/g) || [];
      
      // Count pronouns
      const pronounCounts = countWordsFromList(words, pronouns);
      fillTable('pronounsTable', pronounCounts);
      
      // Count prepositions
      const prepositionCounts = countWordsFromList(words, prepositions);
      fillTable('prepositionsTable', prepositionCounts);
      
      // Count indefinite articles
      const articleCounts = countWordsFromList(words, indefiniteArticles);
      fillTable('articlesTable', articleCounts);
    }
    
    function countWordsFromList(words, wordList) {
      const counts = {};
      
      wordList.forEach(word => {
        counts[word] = 0;
      });
      
      // Count occurrences
      words.forEach(word => {
        if (wordList.includes(word)) {
          counts[word]++;
        }
      });
      

      return Object.entries(counts)
        .filter(([_, count]) => count > 0)  
        .sort((a, b) => {
         
          if (b[1] !== a[1]) {
            return b[1] - a[1];
          }
          return a[0].localeCompare(b[0]);
        });
    }
    
    function fillTable(tableId, wordCounts) {
        const tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = '';
        
        if (wordCounts.length === 0) {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="2" style="text-align: center;">No matches found</td>`;
          tbody.appendChild(row);
          return;
        }
        
        // Populate table with individual word counts only
        wordCounts.forEach(([word, count]) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${word}</td>
            <td>${count}</td>
          `;
          tbody.appendChild(row);
        });
      }
    
    // Event listeners
    analyzeBtn.addEventListener('click', analyzeText);
    
    // Enable analyze on Enter key in textarea
    textInput.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        analyzeText();
      }
    });
});