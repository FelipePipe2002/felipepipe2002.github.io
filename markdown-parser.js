// ============================================
// SIMPLE MARKDOWN PARSER
// ============================================

class MarkdownParser {
    parse(markdown) {
        if (!markdown) return '';

        let html = markdown;

        // Headers (must be done before other replacements)
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>'); // Using h3 for consistency
        html = html.replace(/^# (.*$)/gim, '<h2 class="project-name">$1</h2>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Inline code
        html = html.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');

        // Images ![alt](url) - Must be before links!
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-image" loading="lazy">');

        // Links [text](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="md-link">$1</a>');

        // Unordered lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul class="md-list">$1</ul>');

        // Line breaks - convert double newlines to paragraphs
        html = html.split('\n\n').map(para => {
            // Don't wrap if it's already a block element
            if (para.match(/^<(h[1-6]|ul|li|div)/)) {
                return para;
            }
            // Don't wrap empty lines
            if (para.trim() === '') {
                return '';
            }
            return `<p>${para.replace(/\n/g, '<br>')}</p>`;
        }).join('\n');

        // Clean up any remaining standalone newlines
        html = html.replace(/\n/g, '');

        return html;
    }
}

// Export for use in other files
const markdownParser = new MarkdownParser();
