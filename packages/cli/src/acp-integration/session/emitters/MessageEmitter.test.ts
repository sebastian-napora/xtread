/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MessageEmitter } from './MessageEmitter.js';
import type { SessionContext } from '../types.js';
import type { Config } from '@xtread-code/xtread-core';

describe('MessageEmitter', () => {
  let mockContext: SessionContext;
  let sendUpdateSpy: ReturnType<typeof vi.fn>;
  let emitter: MessageEmitter;

  beforeEach(() => {
    sendUpdateSpy = vi.fn().mockResolvedValue(undefined);
    mockContext = {
      sessionId: 'test-session-id',
      config: {} as Config,
      sendUpdate: sendUpdateSpy,
    };
    emitter = new MessageEmitter(mockContext);
  });

  describe('emitUserMessage', () => {
    it('should send user_message_chunk update with text content', async () => {
      await emitter.emitUserMessage('Hello, world!');

      expect(sendUpdateSpy).toHaveBeenCalledTimes(1);
      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'user_message_chunk',
        content: { type: 'text', text: 'Hello, world!' },
      });
    });

    it('should handle empty text', async () => {
      await emitter.emitUserMessage('');

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'user_message_chunk',
        content: { type: 'text', text: '' },
      });
    });

    it('should handle multiline text', async () => {
      const multilineText = 'Line 1\nLine 2\nLine 3';
      await emitter.emitUserMessage(multilineText);

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'user_message_chunk',
        content: { type: 'text', text: multilineText },
      });
    });
  });

  describe('emitAgentMessage', () => {
    it('should send agent_message_chunk update with text content', async () => {
      await emitter.emitAgentMessage('I can help you with that.');

      expect(sendUpdateSpy).toHaveBeenCalledTimes(1);
      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: { type: 'text', text: 'I can help you with that.' },
      });
    });

    it('should remove <think> XML think tags from agent message content', async () => {
      await emitter.emitAgentMessage(
        '<think> Let me analyze this. </think>\n\nHere is the answer.',
      );

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: { type: 'text', text: 'Here is the answer.' },
      });
    });

    it('should remove <think> tag without closing tag from agent message', async () => {
      await emitter.emitAgentMessage(
        '<think>Unclosed tag followed by real content.',
      );

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: {
          type: 'text',
          text: 'Unclosed tag followed by real content.',
        },
      });
    });

    it('should remove reasoning/analysis labels from agent message', async () => {
      await emitter.emitAgentMessage(
        'Reasoning: Here is my thought process.\nFinal answer here.',
      );

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: {
          type: 'text',
          text: 'Here is my thought process. Final answer here.',
        },
      });
    });
  });

  describe('emitAgentThought', () => {
    it('should send agent_thought_chunk update with text content', async () => {
      await emitter.emitAgentThought('Let me think about this...');

      expect(sendUpdateSpy).toHaveBeenCalledTimes(1);
      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: { type: 'text', text: 'Let me think about this...' },
      });
    });

    it('should remove <think> XML think tags from content', async () => {
      await emitter.emitAgentThought(
        '<think> Let me analyze this problem. Some actual reasoning here.',
      );

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: {
          type: 'text',
          text: 'Let me analyze this problem. Some actual reasoning here.',
        },
      });
    });

    it('should remove multiline <think> XML think tags', async () => {
      const input = '<think>\nMulti-line\nthinking\nClean content after.';
      await emitter.emitAgentThought(input);

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: {
          type: 'text',
          text: 'Multi-line thinking Clean content after.',
        },
      });
    });

    it('should remove <think> tag even if no closing tag present', async () => {
      const input = '<think>Some reasoning here';
      await emitter.emitAgentThought(input);

      // The <think> tag is removed, leaving the content
      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: { type: 'text', text: 'Some reasoning here' },
      });
    });

    it('should remove <think> and  tags separately when unpaired', async () => {
      const input = '<think>\n\nReasoning: Actual thought process here.';
      await emitter.emitAgentThought(input);

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: { type: 'text', text: 'Actual thought process here.' },
      });
    });

    it('should remove "Reasoning:" prefix labels', async () => {
      await emitter.emitAgentThought('Reasoning: Let me work through this...');

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: { type: 'text', text: 'Let me work through this...' },
      });
    });

    it('should remove Chinese "思考:" prefix labels', async () => {
      await emitter.emitAgentThought('思考: 首先分析问题');

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: { type: 'text', text: '首先分析问题' },
      });
    });

    it('should skip emission if content becomes empty after cleaning', async () => {
      await emitter.emitAgentThought('<think>');

      expect(sendUpdateSpy).not.toHaveBeenCalled();
    });
  });

  describe('emitMessage', () => {
    it('should emit user message when role is user', async () => {
      await emitter.emitMessage('User input', 'user');

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'user_message_chunk',
        content: { type: 'text', text: 'User input' },
      });
    });

    it('should emit agent message when role is assistant and isThought is false', async () => {
      await emitter.emitMessage('Agent response', 'assistant', false);

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: { type: 'text', text: 'Agent response' },
      });
    });

    it('should emit agent message when role is assistant and isThought is not provided', async () => {
      await emitter.emitMessage('Agent response', 'assistant');

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: { type: 'text', text: 'Agent response' },
      });
    });

    it('should emit agent thought when role is assistant and isThought is true', async () => {
      await emitter.emitAgentThought('Thinking...');

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_thought_chunk',
        content: { type: 'text', text: 'Thinking...' },
      });
    });

    it('should ignore isThought when role is user', async () => {
      // Even if isThought is true, user messages should still be user_message_chunk
      await emitter.emitMessage('User input', 'user', true);

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'user_message_chunk',
        content: { type: 'text', text: 'User input' },
      });
    });
  });

  describe('multiple emissions', () => {
    it('should handle multiple sequential emissions', async () => {
      await emitter.emitUserMessage('First');
      await emitter.emitAgentMessage('Second');
      await emitter.emitAgentThought('Third');

      expect(sendUpdateSpy).toHaveBeenCalledTimes(3);
      expect(sendUpdateSpy).toHaveBeenNthCalledWith(1, {
        sessionUpdate: 'user_message_chunk',
        content: { type: 'text', text: 'First' },
      });
      expect(sendUpdateSpy).toHaveBeenNthCalledWith(2, {
        sessionUpdate: 'agent_message_chunk',
        content: { type: 'text', text: 'Second' },
      });
      expect(sendUpdateSpy).toHaveBeenNthCalledWith(3, {
        sessionUpdate: 'agent_thought_chunk',
        content: { type: 'text', text: 'Third' },
      });
    });
  });

  describe('emitUsageMetadata', () => {
    it('should emit agent_message_chunk with _meta.usage containing token counts', async () => {
      const usageMetadata = {
        promptTokenCount: 100,
        candidatesTokenCount: 50,
        thoughtsTokenCount: 25,
        totalTokenCount: 175,
        cachedContentTokenCount: 10,
      };

      await emitter.emitUsageMetadata(usageMetadata);

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: { type: 'text', text: '' },
        _meta: {
          usage: {
            inputTokens: 100,
            outputTokens: 50,
            totalTokens: 175,
            thoughtTokens: 25,
            cachedReadTokens: 10,
          },
        },
      });
    });

    it('should include durationMs in _meta when provided', async () => {
      const usageMetadata = {
        promptTokenCount: 10,
        candidatesTokenCount: 5,
        thoughtsTokenCount: 2,
        totalTokenCount: 17,
        cachedContentTokenCount: 1,
      };

      await emitter.emitUsageMetadata(usageMetadata, 'done', 1234);

      expect(sendUpdateSpy).toHaveBeenCalledWith({
        sessionUpdate: 'agent_message_chunk',
        content: { type: 'text', text: 'done' },
        _meta: {
          usage: {
            inputTokens: 10,
            outputTokens: 5,
            totalTokens: 17,
            thoughtTokens: 2,
            cachedReadTokens: 1,
          },
          durationMs: 1234,
        },
      });
    });
  });
});
