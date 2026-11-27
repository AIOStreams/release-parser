import { parseTorrentTitle } from '../index';

describe('Long title tests', () => {
  // Without a "/" or "|" the alt title pattern used to backtrack through every
  // split of the name: 3000 Cyrillic letters took about 30 seconds.
  test('a long Cyrillic name without separators parses quickly', () => {
    const name = 'Фильм ' + 'а'.repeat(3000);
    const started = Date.now();
    const result = parseTorrentTitle(name);
    expect(Date.now() - started).toBeLessThan(3000);
    expect(result.title).toBe(name);
  });
  test('the same after a separator and a bracket', () => {
    const started = Date.now();
    parseTorrentTitle('Movie / (' + 'а'.repeat(3000));
    expect(Date.now() - started).toBeLessThan(3000);
  });
  // The cast pattern did the same on brackets that never close the name.
  test('a long name of unclosed brackets parses quickly', () => {
    const started = Date.now();
    parseTorrentTitle('а('.repeat(1500));
    parseTorrentTitle('a/('.repeat(1000));
    expect(Date.now() - started).toBeLessThan(3000);
  });
  test('a Russian cast list is still removed', () => {
    expect(parseTorrentTitle('Движение вверх (Антон Мегердичев)').title).toBe(
      'Движение вверх'
    );
    expect(parseTorrentTitle('Фильм / Movie (Иван Иванов)').title).toBe(
      'Movie'
    );
  });
  test('alt titles are still removed', () => {
    const result = parseTorrentTitle(
      'Дюна: Часть вторая / Dune: Part Two (2024) BDRip 1080p'
    );
    expect(result.title).toBe('Dune: Part Two');
  });
});
