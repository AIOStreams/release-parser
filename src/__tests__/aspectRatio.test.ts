import { parseTorrentTitle } from '../index';

// "16x9" and "4x3" listed after the resolution or the source of a release are
// the aspect ratio of the video. They are not a season and an episode.
describe('parseTorrentTitle - aspect ratio', () => {
  test('Сумерки. Сага. Рассвет: Часть 2 / The Twilight Saga: Breaking Dawn - Part 2 (Билл Кондон / Bill Condon) [2012, США, фэнтези, драма, мелодрама, приключения, BDRip 1080p, 16x9] Dub + UKR + Original + Sub Rus + Original Eng', () => {
    const result = parseTorrentTitle(
      'Сумерки. Сага. Рассвет: Часть 2 / The Twilight Saga: Breaking Dawn - Part 2 (Билл Кондон / Bill Condon) [2012, США, фэнтези, драма, мелодрама, приключения, BDRip 1080p, 16x9] Dub + UKR + Original + Sub Rus + Original Eng'
    );
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.title).toBe('The Twilight Saga: Breaking Dawn - Part 2');
    expect(result.year).toBe('2012');
    expect(result.resolution).toBe('1080p');
    expect(result.quality).toBe('BDRip');
  });

  test('Сияние / The Shining (Стэнли Кубрик / Stanley Kubrick) [1980, США, мистика, DVDRemux] [FULLSCREEN / 4X3 / ПОЛНОЕ ИЗДАНИЕ] 18X AVO, MVO, DVO, Dub + Sub Eng, Rus, Ukr + Original Eng', () => {
    const result = parseTorrentTitle(
      'Сияние / The Shining (Стэнли Кубрик / Stanley Kubrick) [1980, США, мистика, DVDRemux] [FULLSCREEN / 4X3 / ПОЛНОЕ ИЗДАНИЕ] 18X AVO, MVO, DVO, Dub + Sub Eng, Rus, Ukr + Original Eng'
    );
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.title).toBe('The Shining');
    expect(result.year).toBe('1980');
  });

  test('Movie.2012.BDRip.1080p.16x9.x264', () => {
    const result = parseTorrentTitle('Movie.2012.BDRip.1080p.16x9.x264');
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.title).toBe('Movie');
    expect(result.resolution).toBe('1080p');
    expect(result.quality).toBe('BDRip');
    expect(result.codec).toBe('x264');
  });

  test('Movie 2012 DVDRip WS 16х9: Cyrillic "х"', () => {
    const result = parseTorrentTitle('Movie 2012 DVDRip WS 16х9');
    expect(result.title).toBe('Movie');
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.quality).toBe('DVDRip');
  });

  test('Movie.2012.INTERNAL.BDRip.1080p.16x9.x264', () => {
    const result = parseTorrentTitle(
      'Movie.2012.INTERNAL.BDRip.1080p.16x9.x264'
    );
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.title).toBe('Movie');
    expect(result.resolution).toBe('1080p');
  });

  test('Movie 2012 HFR 2160p 16x9', () => {
    const result = parseTorrentTitle('Movie 2012 HFR 2160p 16x9');
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.title).toBe('Movie');
    expect(result.resolution).toBe('4k');
  });

  test('Movie 2012 Remux 16x9', () => {
    const result = parseTorrentTitle('Movie 2012 Remux 16x9');
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.title).toBe('Movie');
  });

  test('Фильм / Movie [2010, США, VHSRip, 4x3] AVO', () => {
    const result = parseTorrentTitle(
      'Фильм / Movie [2010, США, VHSRip, 4x3] AVO'
    );
    expect(result.seasons).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.title).toBe('Movie');
    expect(result.year).toBe('2010');
  });

  test('Show.S04.720p.HDTV.16x9: the season is kept, no episode', () => {
    const result = parseTorrentTitle('Show.S04.720p.HDTV.16x9');
    expect(result.seasons).toEqual([4]);
    expect(result.episodes).toBeUndefined();
  });

  test('Doctor Who (2005) BluRay 720p 4x3 Daleks in Manhattan: "4x3" outside a list of tags is season 4 episode 3', () => {
    const result = parseTorrentTitle(
      'Doctor Who (2005) BluRay 720p 4x3 Daleks in Manhattan'
    );
    expect(result.title).toBe('Doctor Who');
    expect(result.seasons).toEqual([4]);
    expect(result.episodes).toEqual([3]);
    expect(result.episodeTitle).toBe('Daleks in Manhattan');
  });

  test('Show 720p 4x3', () => {
    const result = parseTorrentTitle('Show 720p 4x3');
    expect(result.seasons).toEqual([4]);
    expect(result.episodes).toEqual([3]);
  });

  test('Show.S02E05.720p.HDTV.16x9.x264: the episode is kept', () => {
    const result = parseTorrentTitle('Show.S02E05.720p.HDTV.16x9.x264');
    expect(result.seasons).toEqual([2]);
    expect(result.episodes).toEqual([5]);
  });

  test('Greys.Anatomy.16x09.HDTV.x264: padded "16x09" is still season 16 episode 9', () => {
    const result = parseTorrentTitle('Greys.Anatomy.16x09.HDTV.x264');
    expect(result.seasons).toEqual([16]);
    expect(result.episodes).toEqual([9]);
  });

  test('Show 16x9 Episode Title 720p HDTV: before the tags "16x9" is season 16 episode 9', () => {
    const result = parseTorrentTitle('Show 16x9 Episode Title 720p HDTV');
    expect(result.title).toBe('Show');
    expect(result.seasons).toEqual([16]);
    expect(result.episodes).toEqual([9]);
    expect(result.resolution).toBe('720p');
  });

  test('The Trip 4x3 HDTV x264: before the tags "4x3" is season 4 episode 3', () => {
    const result = parseTorrentTitle('The Trip 4x3 HDTV x264');
    expect(result.title).toBe('The Trip');
    expect(result.seasons).toEqual([4]);
    expect(result.episodes).toEqual([3]);
  });

  test('Show.4x03.720p.HDTV: padded "4x03" is season 4 episode 3', () => {
    const result = parseTorrentTitle('Show.4x03.720p.HDTV');
    expect(result.seasons).toEqual([4]);
    expect(result.episodes).toEqual([3]);
  });
});
