/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const SERVICE_NAME = 'xtread-code';

export const EVENT_USER_PROMPT = 'xtread-code.user_prompt';
export const EVENT_USER_RETRY = 'xtread-code.user_retry';
export const EVENT_TOOL_CALL = 'xtread-code.tool_call';
export const EVENT_API_REQUEST = 'xtread-code.api_request';
export const EVENT_API_ERROR = 'xtread-code.api_error';
export const EVENT_API_CANCEL = 'xtread-code.api_cancel';
export const EVENT_API_RESPONSE = 'xtread-code.api_response';
export const EVENT_CLI_CONFIG = 'xtread-code.config';
export const EVENT_EXTENSION_DISABLE = 'xtread-code.extension_disable';
export const EVENT_EXTENSION_ENABLE = 'xtread-code.extension_enable';
export const EVENT_EXTENSION_INSTALL = 'xtread-code.extension_install';
export const EVENT_EXTENSION_UNINSTALL = 'xtread-code.extension_uninstall';
export const EVENT_EXTENSION_UPDATE = 'xtread-code.extension_update';
export const EVENT_FLASH_FALLBACK = 'xtread-code.flash_fallback';
export const EVENT_RIPGREP_FALLBACK = 'xtread-code.ripgrep_fallback';
export const EVENT_NEXT_SPEAKER_CHECK = 'xtread-code.next_speaker_check';
export const EVENT_SLASH_COMMAND = 'xtread-code.slash_command';
export const EVENT_IDE_CONNECTION = 'xtread-code.ide_connection';
export const EVENT_CHAT_COMPRESSION = 'xtread-code.chat_compression';
export const EVENT_INVALID_CHUNK = 'xtread-code.chat.invalid_chunk';
export const EVENT_CONTENT_RETRY = 'xtread-code.chat.content_retry';
export const EVENT_CONTENT_RETRY_FAILURE =
  'xtread-code.chat.content_retry_failure';
export const EVENT_CONVERSATION_FINISHED = 'xtread-code.conversation_finished';
export const EVENT_MALFORMED_JSON_RESPONSE =
  'xtread-code.malformed_json_response';
export const EVENT_FILE_OPERATION = 'xtread-code.file_operation';
export const EVENT_MODEL_SLASH_COMMAND = 'xtread-code.slash_command.model';
export const EVENT_SUBAGENT_EXECUTION = 'xtread-code.subagent_execution';
export const EVENT_SKILL_LAUNCH = 'xtread-code.skill_launch';
export const EVENT_AUTH = 'xtread-code.auth';
export const EVENT_USER_FEEDBACK = 'xtread-code.user_feedback';

// Prompt Suggestion Events
export const EVENT_PROMPT_SUGGESTION = 'xtread-code.prompt_suggestion';
export const EVENT_SPECULATION = 'xtread-code.speculation';

// Arena Events
export const EVENT_ARENA_SESSION_STARTED = 'xtread-code.arena_session_started';
export const EVENT_ARENA_AGENT_COMPLETED = 'xtread-code.arena_agent_completed';
export const EVENT_ARENA_SESSION_ENDED = 'xtread-code.arena_session_ended';

// Performance Events
export const EVENT_STARTUP_PERFORMANCE = 'xtread-code.startup.performance';
export const EVENT_MEMORY_USAGE = 'xtread-code.memory.usage';
export const EVENT_PERFORMANCE_BASELINE = 'xtread-code.performance.baseline';
export const EVENT_PERFORMANCE_REGRESSION = 'xtread-code.performance.regression';

// Managed Auto-Memory Events
export const EVENT_MEMORY_EXTRACT = 'xtread-code.memory.extract';
export const EVENT_MEMORY_DREAM = 'xtread-code.memory.dream';
export const EVENT_MEMORY_RECALL = 'xtread-code.memory.recall';
