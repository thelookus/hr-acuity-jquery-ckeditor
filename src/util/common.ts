import $ from 'jquery';

export class Helper {
    static setVoteValueToHtml(_currentValue: string | number) {
        $('#init').html(`${_currentValue}`);
    }

    static escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}