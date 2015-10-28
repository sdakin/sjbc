from django.forms import ModelForm, TextInput, NumberInput
from store.bicycle import Bicycle

class BicycleForm(ModelForm):
	class Meta:
		model = Bicycle
		fields = ['sjbc_id', 'manufacturer', 'model', 'serial_number', 'color',
			'ready_for_sale', 'frame_size_inches', 'wheel_size_inches', 'location',
			'sales_tagline', 'initial_assessment', 'work_performed', 'work_to_do',
			'parts_used', 'parts_needed', 'misc_notes'
		]
		widgets = {
            'sjbc_id': TextInput(attrs={'size': 20}),
            'manufacturer': TextInput(attrs={'size': 20}),
            'model': TextInput(attrs={'size': 20}),
            'color': TextInput(attrs={'size': 20}),
            'serial_number': TextInput(attrs={'size': 20}),
            'frame_size_inches': NumberInput(attrs={'size': 8}),
            'wheel_size_inches': NumberInput(attrs={'size': 8}),
            'location': TextInput(attrs={'size': 20}),
        }
