import { parseTorrentTitle } from '../index';

describe('Upscaled Detection Tests', () => {
  test('AI Upscale', () => {
    const result = parseTorrentTitle(
      'Star.Trek.Deep.Space.Nine.S01E01.AI.Upscale.1080p.x265-GRP'
    );
    expect(result.upscaled).toBe(true);
  });

  test('standalone AI after resolution', () => {
    const result = parseTorrentTitle('Some.Movie.2001.1080p.AI.x264-GRP');
    expect(result.upscaled).toBe(true);
    expect(result.title).toBe('Some Movie');
    expect(result.group).toBe('GRP');
  });

  test('standalone AI before resolution', () => {
    const result = parseTorrentTitle(
      'Some.Movie.2001.AI.1080p.BluRay.x264-GRP'
    );
    expect(result.upscaled).toBe(true);
    expect(result.title).toBe('Some Movie');
  });

  test('standalone AI after source', () => {
    const result = parseTorrentTitle('Some.Movie.2001.WEB-DL.AI.x264-GRP');
    expect(result.upscaled).toBe(true);
    expect(result.title).toBe('Some Movie');
  });

  test('standalone AI after episode title', () => {
    const result = parseTorrentTitle(
      'Star.Trek.Deep.Space.Nine.S01E01.Emissary.1080p.AI.x265-GRP'
    );
    expect(result.upscaled).toBe(true);
    expect(result.episodeTitle).toBe('Emissary');
  });

  test('not upscaled for AI in title', () => {
    const result = parseTorrentTitle(
      'The.AI.Doc.Or.How.I.Became.an.Apocaloptimist.2026.2160p.iT.WEB-DL.DDP5.1.Atmos.DV.HDR.H.265-SCOPE.mkv'
    );
    expect(result.upscaled).toBeUndefined();
    expect(result.title).toBe('The AI Doc Or How I Became an Apocaloptimist');
  });

  test('not upscaled for AI ending title', () => {
    const result = parseTorrentTitle('Killer.AI.2023.1080p.WEB-DL.x264-GRP');
    expect(result.upscaled).toBeUndefined();
    expect(result.title).toBe('Killer AI');
  });

  test('not upscaled for AI in episode title', () => {
    const result = parseTorrentTitle(
      'Show.S01E05.The.AI.Problem.1080p.WEB.h264-GRP'
    );
    expect(result.upscaled).toBeUndefined();
    expect(result.episodeTitle).toBe('The AI Problem');
  });

  test('not upscaled for AI after a dash', () => {
    const result = parseTorrentTitle(
      'Show S01E05 - AI Rising 1080p WEB h264-GRP'
    );
    expect(result.upscaled).toBeUndefined();
    expect(result.episodeTitle).toBe('AI Rising');
  });

  test('not upscaled for AI group', () => {
    const result = parseTorrentTitle('Some.Movie.2001.1080p.x264-AI');
    expect(result.upscaled).toBeUndefined();
    expect(result.group).toBe('AI');
  });

  test('not upscaled for French Ai', () => {
    const result = parseTorrentTitle(
      'Maman.J.Ai.Raté.L.Avion.1990.TVRIP.XViD-ABiTE'
    );
    expect(result.upscaled).toBeUndefined();
    expect(result.title).toBe('Maman J Ai Raté L Avion');
  });
});
