import 'package:flutter/material.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Sample history data - this would come from a database in a real app
    final List<Map<String, dynamic>> historyItems = [
      {
        'text': 'Hello',
        'timestamp': DateTime.now().subtract(const Duration(minutes: 5)),
      },
      {
        'text': 'How are you?',
        'timestamp': DateTime.now().subtract(const Duration(hours: 1)),
      },
      {
        'text': 'Thank you',
        'timestamp': DateTime.now().subtract(const Duration(hours: 2)),
      },
      {
        'text': 'Good morning',
        'timestamp': DateTime.now().subtract(const Duration(days: 1)),
      },
      {
        'text': 'I need help',
        'timestamp': DateTime.now().subtract(const Duration(days: 2)),
      },
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Translation History'),
        backgroundColor: Colors.indigo,
        actions: [
          IconButton(
            icon: const Icon(Icons.delete_sweep),
            onPressed: () {
              // Clear history functionality
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('Clear History'),
                  content: const Text('Are you sure you want to clear all history?'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Cancel'),
                    ),
                    TextButton(
                      onPressed: () {
                        // Clear history logic here
                        Navigator.pop(context);
                      },
                      child: const Text('Clear'),
                      style: TextButton.styleFrom(foregroundColor: Colors.red),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
      body: historyItems.isEmpty
          ? const Center(
              child: Text(
                'No translation history yet',
                style: TextStyle(fontSize: 18, color: Colors.grey),
              ),
            )
          : ListView.builder(
              itemCount: historyItems.length,
              itemBuilder: (context, index) {
                final item = historyItems[index];
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
                  elevation: 2,
                  child: ListTile(
                    contentPadding: const EdgeInsets.all(15),
                    title: Text(
                      item['text'],
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    subtitle: Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        _formatTimestamp(item['timestamp']),
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.volume_up, color: Colors.green),
                          onPressed: () {
                            // Text-to-speech functionality
                          },
                        ),
                        IconButton(
                          icon: const Icon(Icons.copy, color: Colors.blue),
                          onPressed: () {
                            // Copy to clipboard
                          },
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () {
                            // Delete item
                          },
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }

  String _formatTimestamp(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inDays > 0) {
      return '${difference.inDays} ${difference.inDays == 1 ? 'day' : 'days'} ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours} ${difference.inHours == 1 ? 'hour' : 'hours'} ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes} ${difference.inMinutes == 1 ? 'minute' : 'minutes'} ago';
    } else {
      return 'Just now';
    }
  }
}