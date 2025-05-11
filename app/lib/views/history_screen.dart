import 'package:flutter/material.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Sample history data (replace with actual data from database)
    final List<Map<String, dynamic>> historyItems = [
      {
        'sign': 'Hello',
        'timestamp': DateTime.now().subtract(const Duration(minutes: 5)),
        'confidence': 0.95,
      },
      {
        'sign': 'Thank You',
        'timestamp': DateTime.now().subtract(const Duration(hours: 1)),
        'confidence': 0.88,
      },
      {
        'sign': 'Help',
        'timestamp': DateTime.now().subtract(const Duration(hours: 3)),
        'confidence': 0.92,
      },
      {
        'sign': 'Yes',
        'timestamp': DateTime.now().subtract(const Duration(days: 1)),
        'confidence': 0.97,
      },
      {
        'sign': 'No',
        'timestamp': DateTime.now().subtract(const Duration(days: 1, hours: 2)),
        'confidence': 0.91,
      },
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Translation History'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              // Show filter options
            },
          ),
        ],
      ),
      body: historyItems.isEmpty
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.history,
                    size: 80,
                    color: Colors.grey,
                  ),
                  SizedBox(height: 20),
                  Text(
                    'No translation history yet',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ),
            )
          : ListView.builder(
              itemCount: historyItems.length,
              itemBuilder: (context, index) {
                final item = historyItems[index];
                return Card(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.2),
                      child: Text(
                        item['sign'][0],
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.primary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    title: Text(
                      item['sign'],
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    subtitle: Text(
                      _formatTimestamp(item['timestamp']),
                      style: TextStyle(
                        color: Colors.grey[600],
                      ),
                    ),
                    trailing: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: _getConfidenceColor(item['confidence']),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        '${(item['confidence'] * 100).toInt()}%',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    onTap: () {
                      // Show detailed view of the translation
                    },
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

  Color _getConfidenceColor(double confidence) {
    if (confidence >= 0.9) {
      return Colors.green;
    } else if (confidence >= 0.7) {
      return Colors.orange;
    } else {
      return Colors.red;
    }
  }
}