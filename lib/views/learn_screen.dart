import 'package:flutter/material.dart';

class LearnScreen extends StatelessWidget {
  const LearnScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Sample categories for learning
    final List<Map<String, dynamic>> categories = [
      {
        'title': 'Alphabet',
        'icon': Icons.abc,
        'color': Colors.blue,
        'items': 26,
      },
      {
        'title': 'Numbers',
        'icon': Icons.numbers,
        'color': Colors.green,
        'items': 10,
      },
      {
        'title': 'Common Phrases',
        'icon': Icons.message,
        'color': Colors.orange,
        'items': 15,
      },
      {
        'title': 'Greetings',
        'icon': Icons.waving_hand,
        'color': Colors.purple,
        'items': 8,
      },
      {
        'title': 'Emergency Signs',
        'icon': Icons.emergency,
        'color': Colors.red,
        'items': 12,
      },
      {
        'title': 'Daily Activities',
        'icon': Icons.daily_activity,
        'color': Colors.teal,
        'items': 20,
      },
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Learn Sign Language'),
        backgroundColor: Colors.indigo,
      ),
      body: Column(
        children: [
          // Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            color: Colors.indigo.shade50,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Learn Sign Language',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.indigo,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'Explore different categories and practice your sign language skills',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.black54,
                  ),
                ),
              ],
            ),
          ),
          
          // Categories Grid
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(15),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 1.0,
                crossAxisSpacing: 15,
                mainAxisSpacing: 15,
              ),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final category = categories[index];
                return _buildCategoryCard(
                  context,
                  category['title'],
                  category['icon'],
                  category['color'],
                  category['items'],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(
    BuildContext context,
    String title,
    IconData icon,
    Color color,
    int itemCount,
  ) {
    return InkWell(
      onTap: () {
        // Navigate to category details
        // Navigator.push(context, MaterialPageRoute(builder: (context) => CategoryDetailScreen(title: title)));
      },
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15),
        ),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [color.withOpacity(0.7), color],
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  icon,
                  size: 50,
                  color: Colors.white,
                ),
                const SizedBox(height: 15),
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 5),
                Text(
                  '$itemCount ${itemCount == 1 ? 'item' : 'items'}',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.white.withOpacity(0.8),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}