import { test, expect, vi } from "vitest";
import { createRequire } from "node:module";

const { exitApp, shouldBlockKey } = createRequire(import.meta.url)("../app/logic.js");

function fakeTizen(exit) {
  return { application: { getCurrentApplication: () => ({ exit }) } };
}

test("exitApp calls exit and returns true when tizen is available", () => {
  const exit = vi.fn();
  const showFallback = vi.fn();
  expect(exitApp(fakeTizen(exit), showFallback)).toBe(true);
  expect(exit).toHaveBeenCalledTimes(1);
  expect(showFallback).not.toHaveBeenCalled();
});

test("exitApp falls back when tizen is undefined", () => {
  const showFallback = vi.fn();
  expect(exitApp(undefined, showFallback)).toBe(false);
  expect(showFallback).toHaveBeenCalledTimes(1);
});

test("exitApp falls back when tizen.application is missing", () => {
  const showFallback = vi.fn();
  expect(exitApp({}, showFallback)).toBe(false);
  expect(showFallback).toHaveBeenCalledTimes(1);
});

test("exitApp falls back when exit throws", () => {
  const showFallback = vi.fn();
  const exit = () => { throw new Error("boom"); };
  expect(exitApp(fakeTizen(exit), showFallback)).toBe(false);
  expect(showFallback).toHaveBeenCalledTimes(1);
});

test("shouldBlockKey blocks 10009 when tizen can exit", () => {
  expect(shouldBlockKey(fakeTizen(() => {}), 10009)).toBe(true);
});

test("shouldBlockKey does not block 10009 when tizen.application is missing", () => {
  expect(shouldBlockKey({}, 10009)).toBe(false);
});

test("shouldBlockKey does not block 10009 without tizen", () => {
  expect(shouldBlockKey(undefined, 10009)).toBe(false);
});

test("shouldBlockKey does not block 13 when tizen exists", () => {
  expect(shouldBlockKey(fakeTizen(() => {}), 13)).toBe(false);
});

test("exitApp reports reason no-tizen in the browser", () => {
  const showFallback = vi.fn();
  exitApp(undefined, showFallback);
  expect(showFallback).toHaveBeenCalledWith("no-tizen");
});

test("exitApp reports reason exit-failed when tizen exists but exit throws", () => {
  const showFallback = vi.fn();
  exitApp(fakeTizen(() => { throw new Error("boom"); }), showFallback);
  expect(showFallback).toHaveBeenCalledWith("exit-failed");
});
